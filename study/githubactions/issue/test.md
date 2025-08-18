```
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

```


# ✅ 実装スナップショット

## リポジトリ構成（今回追加したもの）
.
└─ .github/
   └─ workflows/
      └─ gemini.yml
##  API設定

- ライブラリから Gemini API を有効化

- 認証情報 → APIキー作成 → コピー

- GitHub の Secrets に登録

  - Gemini API キーの取得手順（Google Cloud または AI Studio）
```
 Google Cloud Console からAPIを取得する方法

以下の手順で進めていけば、APIキーの取得・確認ができます。

a) Google Cloud にログイン

Google Cloud Console にアクセスし、Google アカウントでログイン。

必要に応じて使用する プロジェクトを選択（なければ「新しいプロジェクトを作成」）。

b) Gemini API を有効化

「APIとサービス」→「ライブラリ」 に移動。

検索バーに「Gemini API」と入力して、対象のAPIを選択して 「有効化」 をクリック。

c) 認証情報ページへ

サイドメニューの 「APIとサービス」→「認証情報」 を開く。

「認証情報を作成」ボタンをクリックし、「API キー」 を選ぶ。

新しいAPIキーが即時に発行されます。 生成されたキーが画面に表示／コピー可能です。必要に応じて「制限を追加」（リファラ制限やIP制限など）でセキュリティ対策もできます。
```
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
```

# -------------------------------------------
# テスト手順メモ（コメントとして利用）
# 1) このファイルを commit & push（main など監視ブランチへ）
# 2) 任意の Issue または PR を開く
# 3) コメント:  @gemini hello!
# 4) 期待動作: 同じスレッドに GitHub Actions Bot が
#    「🤖 Geminiからの返事（ダミー）」と返信を投稿
# 5) 失敗時: Actions タブ → 直近のワークフローのログを確認
# -------------------------------------------
