// Google AI SDKをインポート
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

async function run() {
  try {
    // APIにリクエストを送信
    const result = await model.generateContent(commentBody);
    const response = await result.response;
    const text = response.text();

    // GitHub Actionsの次のステップに返答を渡すための特殊な出力
    // ::set-output name=<キー>::<値>
    console.log(`::set-output name=reply::${text}`);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // エラーが発生した場合も、次のステップに渡す
    const errorMessage = "🤖 エラーが発生しました：" + error.message;
    console.log(`::set-output name=reply::${errorMessage}`);
  }
}

run();