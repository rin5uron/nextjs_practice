'''
🎯 目的
GitHub Issue に @gemini とコメントしたら、自動で返事がつく仕組みを試す
まずは ダミーの返事（本物のGemini API呼び出し前）で動作確認するのがゴール

🛠️ 実装内容
・ファイル追加: .github/workflows/gemini.yml

・イベント: issue_comment（コメントが新規投稿されたら発火）

・条件: コメント本文に @gemini が含まれている場合のみ実行

・アクション:
　GitHub Actions ボットが同じ Issue にコメントを返す
　内容は「🤖 Geminiからの返事（ダミー）」

✅ 想定される動き
　IssueやPRに「@gemini hello!」とコメント
　↓
　GitHub Actions がトリガーされる
　↓
　botがそのIssueにコメントを追加する（ダミー文言）
'''

# ✅ 実装スナップショット

# リポジトリ構成（今回追加したもの）
.
└─ .github/
   └─ workflows/
      └─ gemini.yml

# -------------------------------------------
# ファイル: .github/workflows/gemini.yml
# 目的: Issue/PR に @gemini を含むコメントが付いたら、ダミー返信を返す
# トリガー: issue_comment（新規コメント）
# 権限: issues: write（コメント投稿に必要）
# -------------------------------------------
name: Gemini reply

on:
  issue_comment:
    types: [created]

permissions:
  issues: write

jobs:
  reply:
    if: contains(github.event.comment.body, '@gemini')
    runs-on: ubuntu-latest
    steps:
      - name: Reply with Gemini (dummy)
        uses: peter-evans/create-or-update-comment@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          issue-number: ${{ github.event.issue.number }}
          body: "🤖 Geminiからの返事（ダミー）"

# -------------------------------------------
# テスト手順メモ（コメントとして利用）
# 1) このファイルを commit & push（main など監視ブランチへ）
# 2) 任意の Issue または PR を開く
# 3) コメント:  @gemini hello!
# 4) 期待動作: 同じスレッドに GitHub Actions Bot が
#    「🤖 Geminiからの返事（ダミー）」と返信を投稿
# 5) 失敗時: Actions タブ → 直近のワークフローのログを確認
# -------------------------------------------
