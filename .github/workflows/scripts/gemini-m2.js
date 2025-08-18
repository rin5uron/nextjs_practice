import fs from "node:fs";import path from "node:path";import { execSync } from "node:child_process";import { GoogleGenerativeAI } from "@google/genai";const API_KEY = process.env.GEMINI_API_KEY;const ISSUE = process.env.ISSUE_BODY || "";const COMMENT = process.env.COMMENT_BODY || "";if (!API_KEY) throw new Error("GEMINI_API_KEY is missing");const userInstruction = COMMENT.replace(/^[\s\S]*?@gemini\s*/i, "").trim();const preamble = `
あなたはGitHub Actions用の自動化アシスタントです。
このリポジトリに対して必要なファイル生成・更新と、必要なシェルコマンドを提案してください。
必ず application/json で返し、以下のスキーマに従ってください。説明文やコードブロック記号は一切出力しないこと。

{ "type": "object",
  "properties": {
    "files": { "type": "array", "items": {
      "type": "object",
      "properties": { "path": { "type": "string" }, "content": { "type": "string" } },
      "required": ["path", "content"]
    }},
    "commands": { "type": "array", "items": { "type": "string" } }
  },
  "required": ["files", "commands"]
}

制約:
- path は相対パス（例: src/..., docs/...）
- content はUTF-8テキストのみ
- commands は "pnpm install" / "pnpm run build" / "pnpm run lint" / "pnpm run dev" のみに限定
`;const prompt = `
# Issue
${ISSUE}

# User instruction
${userInstruction || "(特になし)"}
`;const genai = new GoogleGenerativeAI(API_KEY);const model = genai.getGenerativeModel({
  model: "gemini-1.5-flash", // 速くて安価。必要なら -pro に変更
});const res = await model.generateContent({
  contents: [
    { role: "user", parts: [{ text: preamble }] },
    { role: "user", parts: [{ text: prompt }] },
  ],
  generationConfig: {
    responseMimeType: "application/json"
  }
});// ---- JSONパース（堅牢化） ----
let raw = res.response.text();
fs.writeFileSync("gemini.m2.out", raw, "utf8"); // 生成物の原本を保存

// 念のため、三連バッククォート等を除去（モデルが付けてしまう場合に備える）
raw = raw.trim();
if (raw.startsWith("```")) {
  raw = raw.replace(/^```[a-zA-Z]*\n/, "").replace(/```$/, "").trim();
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  fs.writeFileSync("gemini.m2.log", `JSON parse error: ${e.message}\n---RAW---\n${raw}`, "utf8");
  throw e;
}

const files = Array.isArray(data.files) ? data.files : [];
const commands = Array.isArray(data.commands) ? data.commands : [];

const allowList = new Set([
  "pnpm install",
  "pnpm run build",
  "pnpm run lint",
  "pnpm run dev"
]);

// ---- ファイル書き込み ----
for (const f of files) {
  if (!f?.path || typeof f.path !== "string") continue;
  if (typeof f.content !== "string") continue;

  const abs = path.resolve(process.cwd(), f.path);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, f.content, "utf8");
  console.log("[WRITE]", f.path, `(${f.content.length} bytes)`);
}

// ---- コマンド実行（安全ガード） ----
for (const cmd of commands) {
  if (!allowList.has(cmd)) {
    console.log("[SKIP - not allowed]", cmd);
    continue;
  }
  console.log("[RUN]", cmd);
  try {
    const out = execSync(cmd, { stdio: "pipe", encoding: "utf8" });
    fs.appendFileSync("gemini.m2.log", `\n$ ${cmd}\n${out}\n`);
  } catch (e) {
    fs.appendFileSync("gemini.m2.log", `\n$ ${cmd}\nERROR: ${e.message}\nSTDERR:\n${e.stderr || ""}\n`);
    // 続行（他のコマンドは試す）
  }
}

console.log("M2 done.");