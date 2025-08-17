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
    let processed = false;

    // 1. Remove markdown code blocks
    const cleanedText = text.replace(/^```(?:json|javascript|bash|)\s*\n|\n```$/g, '').trim();

    // 2. Try JSON parsing first (as before)
    try {
      const jsonResponse = JSON.parse(cleanedText);
      if (jsonResponse.type === 'FILE_CHANGE' && jsonResponse.path && jsonResponse.content !== undefined) {
        console.log(`Detected JSON FILE_CHANGE: Path=${jsonResponse.path}, Content=${jsonResponse.content.substring(0, 50)}...`);
        await writeFile(jsonResponse.path, jsonResponse.content);
        processed = true;
      } else if (jsonResponse.type === 'RUN_COMMAND' && jsonResponse.command) {
        console.log(`Detected JSON RUN_COMMAND: Command=${jsonResponse.command}`);
        await runCommand(jsonResponse.command);
        processed = true;
      }
    } catch (e) {
      console.log("Response is not a valid JSON or not in expected JSON format. Attempting multi-line/keyword parsing.");
    }

    // 3. If not processed by JSON, attempt multi-line/keyword parsing
    if (!processed) {
      const lines = cleanedText.split('\n').map(line => line.trim()).filter(line => line !== '');

      let currentInstruction = null;
      let filePath = null;
      let fileContent = [];
      let command = null;

      for (const line of lines) {
        if (line.startsWith('FILE_CHANGE')) {
          currentInstruction = 'FILE_CHANGE';
          filePath = null;
          fileContent = [];
        } else if (line.startsWith('RUN_COMMAND')) {
          currentInstruction = 'RUN_COMMAND';
          command = null;
        } else if (currentInstruction === 'FILE_CHANGE' && line.startsWith('path:')) {
          filePath = line.substring('path:'.length).trim();
        } else if (currentInstruction === 'FILE_CHANGE' && line.startsWith('content:')) {
          fileContent.push(line.substring('content:'.length).trim());
        } else if (currentInstruction === 'RUN_COMMAND' && command === null) { // Capture the command line
          command = line;
        } else if (currentInstruction === 'FILE_CHANGE') { // Accumulate multi-line content
          fileContent.push(line);
        }
      }

      if (currentInstruction === 'FILE_CHANGE' && filePath && fileContent.length > 0) {
        const finalContent = fileContent.join('\n'); // Join multi-line content
        console.log(`Detected Multi-line FILE_CHANGE: Path=${filePath}, Content=${finalContent.substring(0, 50)}...`);
        try {
          await writeFile(filePath, finalContent);
          processed = true;
        } catch (writeError) {
          console.error(`Failed to write file: ${filePath}`, writeError);
        }
      } else if (currentInstruction === 'RUN_COMMAND' && command) {
        console.log(`Detected Multi-line RUN_COMMAND: Command=${command}`);
        try {
          await runCommand(command);
          processed = true;
        } catch (commandError) {
          console.error(`Failed to execute command: ${command}`, commandError);
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