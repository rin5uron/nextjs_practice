## 目次

*   [Step 1：メールアドレス認証ログインフォームの作成](#step-1メールアドレス認証ログインフォームの作成)
*   [Step 2：Google認証ログインの追加](#step-2google認証ログインの追加)
*   [Step 3：LINE認証ログインの追加](#step-3line認証ログインの追加)
*   [🔐 Supabaseログイン機能をサイトで実際に活用するためのチェックリスト](#-supabaseログイン機能をサイトで実際に活用するためのチェックリスト)

---

# Step 1：メールアドレス認証ログインフォームの作成

## 🎯 ゴール

- Supabaseを使って、メールアドレス + パスワードでログインできるフォームをNext.jsで作成する。

---

## 🔧 準備

1. Supabaseアカウント作成（[https://supabase.com](https://supabase.com)）
2. プロジェクト作成（URLとAnonキーを控える）
3. 「Authentication」→「メールログイン」ON

---

## 📁 ディレクトリ構成（例）

```
/my-app/
├─ pages/
│   ├─ login.tsx
├─ lib/
│   └─ supabase.ts
├─ .env.local
```

---

## 📦 ライブラリ導入

```bash
npm install @supabase/supabase-js
```

---

## 📄 .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📄 lib/supabase.ts

```ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabase
```

---

## 🖊 pages/login.tsx（最小構成）

```tsx
import { useState } from 'react'
import supabase from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('ログイン成功！')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="メールアドレス" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="パスワード" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">ログイン</button>
      <p>{message}</p>
    </form>
  )
}
```

---

次のステップ 👉 Step 2：Googleログインを追加してみよう！
<br><br><br>
# Step 2：Google認証ログインの追加

## 🎯 ゴール

- SupabaseでGoogleログインを有効化し、Next.jsアプリで認証処理を実装する。

---

## 🔧 事前準備

1. Supabase → Authentication → GoogleプロバイダをON
2. [Google Cloud Console](https://console.cloud.google.com/)でOAuthクライアントを作成
3. リダイレクトURLを登録：
   ```
   https://<your-project>.supabase.co/auth/v1/callback
   ```

---

## 🖊 Google認証ボタンの実装（例）

```tsx
import supabase from '../lib/supabase'

const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({ provider: 'google' })
}

export default function GoogleLogin() {
  return (
    <button onClick={handleGoogleLogin}>
      Googleでログイン
    </button>
  )
}
```

---

## 🔁 ログイン後のリダイレクトについて

- 認証後、Supabaseが自動で設定したリダイレクトURLに戻す
- ログイン成功後の状態管理は `supabase.auth.getUser()` などで取得

---

## ✅ 補足

- ローカル開発時は `http://localhost:3000` もリダイレクトURLに追加しておこう

---

次のステップ 👉 Step 3：LINEログインに挑戦！
<br><br><br>
# Step 3：LINE認証ログインの追加

## 🎯 ゴール

- Supabaseを使って、LINEアカウントでログインできる機能を実装する

---

## 🔧 事前準備

1. [LINE Developers](https://developers.line.biz/ja/) にログイン
2. チャネル作成（プロバイダー → LINEログイン）
3. 必要な設定を入力：
   - チャネル名、メール、アイコンなど
   - リダイレクトURLに以下を追加：
     ```
     https://<your-project>.supabase.co/auth/v1/callback
     ```

4. Supabase AuthでLINEプロバイダをONにして、クライアントIDとシークレットを入力

---

## 🖊 LINEログインボタンの実装

```tsx
import supabase from '../lib/supabase'

const handleLineLogin = async () => {
  await supabase.auth.signInWithOAuth({ provider: 'line' })
}

export default function LineLogin() {
  return (
    <button onClick={handleLineLogin}>
      LINEでログイン
    </button>
  )
}
```

---

## 🔍 注意点

- LINEは審査が必要な場合もある（プロダクション利用時）
- リダイレクトのURLミスに注意！

---

## 🎉 3ステップ完了！

- メール認証：`signInWithPassword`
- Google認証：`signInWithOAuth({ provider: 'google' })`
- LINE認証　：`signInWithOAuth({ provider: 'line' })`

---

👉 あとはログアウト、ユーザー情報表示、保護ページに進もう！
# 🔐 Supabaseログイン機能をサイトで実際に活用するためのチェックリスト

このリストは、Step1〜3の教材で実装したログイン機能を**実際のサイトで活用可能な状態にするための作業項目**をまとめたものです。

---

## ✅ Supabase 側の設定確認

- [ ] プロジェクトを本番用に用意（または既存を流用）
- [ ] Authentication 設定で **メール / Google / LINE** を有効化
- [ ] Google Cloud Console で OAuth クライアントを作成し、**リダイレクトURLを登録**
- [ ] LINE Developers コンソールでチャネル作成し、**同じくリダイレクトURLを登録**
- [ ] 本番URLでの認証が通るように Supabase 側に **正しいリダイレクトURL** を登録

---

## ✅ Next.js 側の対応

- [ ] `.env.local` に **本番用の Supabase URL & Anon Key** を設定
- [ ] ログイン成功時の **リダイレクト処理 or メッセージ表示** を追加
- [ ] `supabase.auth.getUser()` でログイン状態を監視し、UIを出し分け
- [ ] `supabase.auth.signOut()` でログアウトボタンを実装
- [ ] ログインしていないと見れないページ（保護ページ）を作る

---

## ✅ UI・UXの仕上げ（オプションだけど推奨）

- [ ] ログイン中かどうかでナビゲーションを切り替える
- [ ] 未入力チェック（バリデーション）をフォームに追加
- [ ] ローディング中のスピナーやステータス表示
- [ ] レスポンシブ対応・UIスタイルの調整

---

## ✅ 公開準備（デプロイ）

- [ ] Vercel にプロジェクトをデプロイ（公式推奨）
- [ ] Supabaseの環境変数を Vercel 側に設定（URL・APIキー）
- [ ] カスタムドメインがある場合は独自ドメイン設定
- [ ] 認証後のリダイレクト先が **実際の本番URLと一致しているか確認**

---

## ✅ 最終チェック（完成版サイト）

- [ ] メールでログインできる
- [ ] Googleアカウントでログインできる
- [ ] LINEアカウントでログインできる
- [ ] ログイン後にマイページやダッシュボードが表示される
- [ ] ログアウトして再ログインできる

---

