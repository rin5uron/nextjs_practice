# 0. JSON 超入門（これだけ覚えればOK）
- {} はオブジェクト、[] は配列。
- 文字列は必ずダブルクォート " で囲む（' はダメ）。
- key もダブルクォートで書く: { "name": "Alice" }
- 末尾のカンマは禁止: { "a": 1, } ← ダメ
- 使える値: 文字列/数値/true/false/null/オブジェクト/配列

例:
{
  "files": [
    { "path": "docs/hello.md", "content": "# Hello\n" }
  ],
  "commands": ["pnpm install", "pnpm run build"]
}

# 2. 想定JSON（Geminiに出させる形）
{
  "files": [
    { "path": "docs/plan.md", "content": "# Plan\n..." },
    { "path": "src/lib/util.ts", "content": "export const x=1;\n" }
  ],
  "commands": ["pnpm install", "pnpm run build"]
}

# 3. プロンプト（Geminiに渡す文）
（コメントの @gemini 以降を user入力として、この定型を前置き）
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
- commands は "pnpm install" / "pnpm run build" / "pnpm run lint" など最低限に限定

# 4. 置くファイル一覧
.github/
└─ workflows/
   └─ gemini-m2.yml
.github/workflows/scripts/
└─ gemini-m2.js
# 5. .github/workflows/gemini-m2.yml
name: M2 - Gemini JSON -> file & command

on:
  issue_comment:
    types: [created]

permissions:
  contents: write   # ファイル反映をpushする場合に必要（この例はpushしないが付けておく）
  issues: write

jobs:
  run:
    if: contains(github.event.comment.body, '@gemini')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Setup minimal project for script
        run: |
          npm init -y
          # ESMを使うためにtype:module化
          node -e "let p=require('./package.json');p.type='module';require('fs').writeFileSync('package.json', JSON.stringify(p,null,2));"
          npm i @google/genai@latest

      - name: Run Gemini (M2)
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          ISSUE_BODY: ${{ github.event.issue.body }}
          COMMENT_BODY: ${{ github.event.comment.body }}
        run: node .github/workflows/scripts/gemini-m2.js

      - name: Upload artifacts (確認用)
        uses: actions/upload-artifact@v4
        with:
          name: m2-output
          path: |
            **/*.m2.log
            **/*.m2.out
            docs/**
            src/**

      # ※本当にリポジトリに残したいなら下を外して使う
      # - name: Commit & push changes (optional)
      #   run: |
      #     git config user.name "github-actions[bot]"
      #     git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
      #     git add -A
      #     git commit -m "chore: apply M2 changes (auto)" || echo "nothing to commit"
      #     git push
// 6. .github/workflows/scripts/gemini-m2.js
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { GoogleGenerativeAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const ISSUE = process.env.ISSUE_BODY || "";
const COMMENT = process.env.COMMENT_BODY || "";
if (!API_KEY) throw new Error("GEMINI_API_KEY is missing");

const userInstruction = COMMENT.replace(/^[\s\S]*?@gemini\s*/i, "").trim();

const preamble = `
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
`;

const prompt = `
# Issue
${ISSUE}

# User instruction
${userInstruction || "(特になし)"}
`;

const genai = new GoogleGenerativeAI(API_KEY);
const model = genai.getGenerativeModel({
  model: "gemini-1.5-flash", // 速くて安価。必要なら -pro に変更
});

const res = await model.generateContent({
  contents: [
    { role: "user", parts: [{ text: preamble }] },
    { role: "user", parts: [{ text: prompt }] },
  ],
  generationConfig: {
    responseMimeType: "application/json"
  }
});

// ---- JSONパース（堅牢化） ----
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
# 7. 使い方（テスト手順）
1) 上の2ファイルをコミット＆push
2) ppura に GEMINI_API_KEY を登録
3) Issue か PR でコメント:
   @gemini docs/plan.md を作って、ビルドできるように設定して。必要ならコマンドも。
4) Actions が走る → Artifacts の m2-output を開いて
   - gemini.m2.out（モデルのJSON原文）
   - gemini.m2.log（コマンド実行ログ）
   - 生成/更新された docs/**, src/** など
   を確認
5) 問題なければ「Commit & push」のステップを有効化して、変更をリポジトリに反映
# 8. なぜこれで安定するの？
- モデル出力を application/json に固定 → ":" と "|" が混ざる問題を根絶
- JSONパース前にバッククォート除去 → コードブロック癖にも耐性
- コマンドは許可リストで制限 → 安全（勝手に危険コマンドは走らない）
- 生成物とログをArtifactsに保存 → 何が起きたか毎回追える

