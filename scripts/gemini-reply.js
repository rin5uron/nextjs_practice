// Google AI SDKをインポート
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

// 環境変数からAPIキーとコメント本文を取得
const apiKey = process.env.GEMINI_API_KEY;
const commentBody = process.env.COMMENT_BODY;

// Geminiモデルを初期化
const genAI = new GoogleGenerativeAI(apiKey);
// // ❌ NG
// const model = genai.getGenerativeModel({ model: "gemini-pro" });

// // ✅ OK（おすすめはflash）
// const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });
// // or
// const model = genai.getGenerativeModel({ model: "gemini-1.5-pro" });

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ファイル書き込み関数
async function writeFile(filePath, fileContent) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
    fs.writeFileSync(filePath, fileContent);
    console.log(`Successfully wrote to file: ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
    throw error; // エラーを再スローして、呼び出し元で処理できるようにする
  }
}

// コマンド実行関数
async function runCommand(command) {
  try {
    console.log(`Executing command: ${command}`);
    const output = child_process.execSync(command, { encoding: 'utf8' });
    console.log(`Command output:\n${output}`);
  } catch (error) {
    console.error(`Error executing command: ${command}`, error.message);
    throw error; // エラーを再スローして、呼び出し元で処理できるようにする
  }
}

async function run() {
  try {
    // APIにリクエストを送信
    const result = await model.generateContent(commentBody);
    const response = await result.response;
    const text = response.text();

    // --- ここからGeminiの応答を解析するロジックを追加 ---
    let processed = false; // Flag to check if any instruction was processed

    try {
      const jsonResponse = JSON.parse(text);
      if (jsonResponse.type === 'FILE_CHANGE' && jsonResponse.path && jsonResponse.content !== undefined) {
        console.log(`Detected JSON FILE_CHANGE: Path=${jsonResponse.path}, Content=${jsonResponse.content.substring(0, 50)}...`);
        await writeFile(jsonResponse.path, jsonResponse.content);
        processed = true;
      } else if (jsonResponse.type === 'RUN_COMMAND' && jsonResponse.command) {
        console.log(`Detected JSON RUN_COMMAND: Command=${jsonResponse.command}`);
        await runCommand(jsonResponse.command);
        processed = true;
      }
      // Add more JSON types if needed in the future
    } catch (e) {
      // Not a valid JSON or not our expected JSON format, fall through to line parsing
      console.log("Response is not a valid JSON or not in expected JSON format. Attempting line-by-line parsing.");
    }

    if (!processed) { // Only attempt line-by-line parsing if JSON wasn't processed
      const lines = text.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('FILE_CHANGE')) { // Just check for "FILE_CHANGE"
          const regex = /FILE_CHANGE\s+"([^"]+)"\s+"([^"]+)"/; // Regex to capture path and content in quotes
          const match = line.match(regex);
          if (match && match.length === 3) {
            const filePath = match[1];
            const fileContent = match[2];
            console.log(`Detected FILE_CHANGE: Path=${filePath}, Content=${fileContent.substring(0, 50)}...`);
            try {
              await writeFile(filePath, fileContent);
              processed = true;
            } catch (writeError) {
              console.error(`Failed to write file: ${filePath}`, writeError);
            }
          } else {
            console.warn(`Invalid FILE_CHANGE format: ${line}`);
          }
        } else if (line.startsWith('RUN_COMMAND:')) {
          // RUN_COMMAND指示の解析
          const command = line.substring('RUN_COMMAND:'.length).trim();
          console.log(`Detected RUN_COMMAND: Command=${command}`);
          try {
            await runCommand(command); // ここでコマンド実行関数を呼び出す
            processed = true;
          } catch (commandError) {
            console.error(`Failed to execute command: ${command}`, commandError);
          }
        } else {
          console.log(`Unrecognized line (line-by-line): ${line}`);
        }
      }
    }

    if (!processed) {
      console.warn("No recognized instructions found in Gemini's response.");
    }
    // --- ここまでGeminiの応答を解析するロジックを追加 ---

    // GitHub Actionsの次のステップに返答を渡すための特殊な出力
    // ::set-output name=<キー>::<値>
    fs.writeFileSync(process.env.GITHUB_OUTPUT, `reply=${text}`, { flag: 'a' });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // エラーが発生した場合も、次のステップに渡す
    const errorMessage = "🤖 エラーが発生しました：" + error.message;
    fs.writeFileSync(process.env.GITHUB_OUTPUT, `reply=${errorMessage}`, { flag: 'a' });
  }
}

run();