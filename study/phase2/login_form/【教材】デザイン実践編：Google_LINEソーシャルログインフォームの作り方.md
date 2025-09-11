# 【教材】デザイン実践編：Google & LINE対応のモダンなログインフォーム作成ガイド
☑️実践完了日：2025/9/10
---
この教材では、復習を兼ねながら、デザインとユーザー体験を重視したモダンなログインページをゼロから構築します。

機能の実装だけでなく、「なぜこのデザインなのか？」という背景も学びながら、ユーザーが使いたくなるような、美しく実践的なログインページを一緒に作っていきましょう。

**今回のゴール:**
*   Next.jsとSupabaseを使用
*   メールアドレス、Google、LINEの3つの認証方法を実装
*   デザインのベストプラクティスを学ぶ
*   新しい `/signin` ルートにページを作成する

---

## パート1: デザインの基本とプロジェクトの準備

優れたログインページは、機能的であると同時に、直感的で信頼感を与えるデザインが不可欠です。

### 1.1. ソーシャルログインUIの鉄則

1.  **公式ブランドの活用:** ボタンには、ユーザーが一目でどのサービスか認識できるよう、公式のロゴとブランドカラーを使いましょう。これにより、ユーザーは安心してボタンを押すことができます。
2.  **明確なアクションの提示:** ボタンの文言は「Googleでログイン」「LINEで続ける」のように、ユーザーが行うアクションが明確にわかるようにします。
3.  **配置の工夫:** ソーシャルログインは、メールアドレス入力よりも手間が少ないため、フォームの上部に配置するとユーザーの目に留まりやすくなります。また、従来のメールフォームとの間に「または」のような区切り線を入れるのも定番のデザインです。

### 1.2. ファイル構成の準備

今回のプロジェクトで作成・使用するファイルは以下の通りです。コマンドで一気に準備しましょう。

**ターミナルコマンド:**

```bash
mkdir -p src/app/signin
touch src/app/signin/page.tsx
touch src/app/signin/signin-form.module.css

mkdir -p src/components/ui
touch src/components/ui/GoogleLoginButton.tsx
touch src/components/ui/LineLoginButton.tsx
```

---

## パート2: スタイリッシュなログインフォームのUI構築（復習）

まずは、ページの土台となるUIを構築します。

**`src/app/signin/page.tsx` に以下を記述:**

```tsx
// src/app/signin/page.tsx
import styles from './signin-form.module.css';

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>ログインまたは新規登録</h1>

        {/* --- ソーシャルログインボタンはここに配置 --- */}

        <div className={styles.divider}>または</div>

        <form> {/* 機能は後で追加 */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit" className={styles.emailButton}>
            メールアドレスで続ける
          </button>
        </form>
      </div>
    </div>
  );
}
```

**`src/app/signin/signin-form.module.css` に以下を記述:**

```css
/* src/app/signin/signin-form.module.css */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 2rem;
}

.formWrapper {
  width: 100%;
  max-width: 400px;
  padding: 3rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #aaa;
  margin: 2rem 0;
  font-size: 0.9rem;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.divider:not(:empty)::before {
  margin-right: .5em;
}

.divider:not(:empty)::after {
  margin-left: .5em;
}

.inputGroup {
  margin-bottom: 1.5rem;
}

.inputGroup label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.inputGroup input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.emailButton {
  width: 100%;
  padding: 0.8rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.emailButton:hover {
  background-color: #555;
}
```

この時点で `http://localhost:3000/signin` にアクセスし、洗練されたデザインのフォームが表示されるか確認しましょう。

---

## パート3: Googleログインボタンの実装（デザイン強化版）

### 3.1. Googleのブランドガイドライン
Googleは、ユーザーに一貫した体験を提供するため、ボタンのデザインに[ガイドライン](https://developers.google.com/identity/branding-guidelines)を設けています。今回はこれに準拠したデザインを作成します。

### 3.2. ボタンコンポーネントの作成

**`src/components/ui/GoogleLoginButton.tsx` に以下を記述:**

```tsx
// src/components/ui/GoogleLoginButton.tsx
"use client";

import supabase from "@/lib/supabase"; // Supabaseクライアントをインポート
import styles from './social-buttons.module.css';

// GoogleのロゴSVG
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    await supabase.signin.signInWithOAuth({ provider: 'google' });
  };

  return (
    <button onClick={handleGoogleLogin} className={`${styles.socialButton} ${styles.google}`}>
      <GoogleIcon />
      <span>Googleで続ける</span>
    </button>
  );
}
```

### 3.3. 共通CSSの作成

GoogleとLINEのボタンで共通して使えるCSSを作成します。

**`src/components/ui/social-buttons.module.css` を作成して以下を記述:**

```css
/* src/components/ui/social-buttons.module.css */
.socialButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  gap: 0.75rem; /* アイコンとテキストの間隔 */
  margin-bottom: 1rem;
}

.google {
  background-color: #fff;
  color: #333;
  border: 1px solid #e0e0e0;
}

.google:hover {
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
```

---

## パート4: LINEログインボタンの実装（デザイン強化版）

### 4.1. LINEのブランドガイドライン
LINEも同様に、緑色（`#06C755`）を基調としたデザインが推奨されています。

### 4.2. ボタンコンポーネントの作成

**`src/components/ui/LineLoginButton.tsx` に以下を記述:**

```tsx
// src/components/ui/LineLoginButton.tsx
"use client";

import supabase from "@/lib/supabase";
import styles from './social-buttons.module.css';

// LINEのロゴSVG
const LineIcon = () => (
  <svg viewBox="0 0 1024 1024" width="24px" height="24px" fill="#fff">
    <path d="M791.5 480.1c0-132.2-107.8-239.3-240.7-239.3-133.3 0-241.2 107.1-241.2 239.3 0 84.4 43.8 158.3 110.1 202.4l-28.2 78.3c-5.5 15.2 11.4 28.4 25.9 21.4l95.3-45.3c12.5 2.1 25.3 3.2 38.1 3.2 133.3 0 241.2-107.1 241.2-239.3zM653.9 548.2h-45.9V483h-34.8v65.2h-45.9v-88.2c0-19.2 15.7-34.8 34.8-34.8h91.7v-34.8h-91.7c-38.4 0-69.6 31.2-69.6 69.6v88.2h-34.8V393.6h34.8v45.9h69.6v-45.9h34.8v154.6zM424.4 548.2h-75.1V393.6h34.8v119.8h40.3v34.8zM299.2 428.4c-19.2 0-34.8-15.7-34.8-34.8s15.7-34.8 34.8-34.8 34.8 15.7 34.8 34.8-15.7 34.8-34.8 34.8z"></path>
  </svg>
);

export default function LineLoginButton() {
  const handleLineLogin = async () => {
    await supabase.signin.signInWithOAuth({ provider: 'line' });
  };

  return (
    <button onClick={handleLineLogin} className={`${styles.socialButton} ${styles.line}`}>
      <LineIcon />
      <span>LINEで続ける</span>
    </button>
  );
}
```

### 4.3. CSSの追加

**`src/components/ui/social-buttons.module.css` に追記:**

```css
/* ... .google の下に追加 ... */
.line {
  background-color: #06C755;
  color: white;
  border: none;
}

.line:hover {
  background-color: #05a649;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

---

## パート5: 最終的な組み立てと動作確認

最後に、作成したボタンをログインページに組み込みます。

**`src/app/signin/page.tsx` を以下のように更新:**

```tsx
// src/app/signin/page.tsx
import styles from './signin-form.module.css';
import GoogleLoginButton from '@/components/ui/GoogleLoginButton'; // Googleボタンをインポート
import LineLoginButton from '@/components/ui/LineLoginButton';   // LINEボタンをインポート

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>ログインまたは新規登録</h1>

        {/* --- ソーシャルログインボタンを配置 --- */}
        <div className={styles.socialLogins}>
          <GoogleLoginButton />
          <LineLoginButton />
        </div>

        <div className={styles.divider}>または</div>

        <form> {/* 機能は後で追加 */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit" className={styles.emailButton}>
            メールアドレスで続ける
          </button>
        </form>
      </div>
    </div>
  );
}
```

**`src/app/signin/signin-form.module.css` に `.socialLogins` スタイルを追記:**

```css
/* ... .title の下あたりに追加 ... */
.socialLogins {
  display: flex;
  flex-direction: column;
}
```

### 動作確認

1.  Supabaseと各プロバイダー（Google, LINE）の設定が完了していることを確認してください。
2.  `npm run dev` で開発サーバーを起動し、`http://localhost:3000/signin` にアクセスします。
3.  美しくデザインされたGoogleとLINEのログインボタン、そしてメールフォームが表示されているはずです。
4.  各ボタンをクリックし、それぞれの認証フローが正常に動作することを確認してください。

お疲れ様でした！これで、デザインと実用性を両立した、モダンなログインページの完成です。今回学んだコンポーネント化やデザインの考え方は、他のページを作成する際にも大いに役立つでしょう。

---

## パート6: Supabaseとプロバイダーの設定

ソーシャルログインを機能させるには、Supabase側での設定が不可欠です。

### 6.1. Supabaseプロジェクトの環境変数設定

1.  **Supabaseプロジェクトの作成:**
    *   [Supabase公式サイト](https://supabase.com/)にアクセスし、新しいプロジェクトを作成します。

    

2.  **APIキーの取得:**
    *   プロジェクトのダッシュボードで、`Settings` > `API` に移動します。
    *   `Project URL` と `Project API keys` にある `anon` `public` キーをコピーします。

3.  **環境変数ファイルの設定:**
    *   Next.jsプロジェクトのルートに `.env.local` という名前のファイルを作成します（存在しない場合）。
    *   コピーしたURLとキーを以下のように記述します。`src/lib/supabase.ts`で使われている変数名と一致させます。

    ```.env.local
    NEXT_PUBLIC_SUPABASE_URL=ここにあなたのProject URLを貼り付け
    NEXT_PUBLIC_SUPABASE_ANON_KEY=ここにあなたのanon publicキーを貼り付け
    ```

4.  **.gitignoreの確認:**
    *   セキュリティのため、`.env.local`ファイルがGitの追跡対象外になっていることを確認してください。プロジェクトの`.gitignore`ファイルに以下の記述があるはずです。

    ```.gitignore
    # local env files
    .env*.local
    ```

### 6.2. 認証ヘルパーライブラリのインストール

Supabase認証をNext.jsのサーバー環境で簡単かつ安全に扱うために、公式のヘルパーライブラリ `@supabase/ssr` が必要です。以下のコマンドでインストールします。

```bash
npm install @supabase/ssr
```

このライブラリの導入に伴い、認証処理の仕組みが変更になります。詳細なコードは各コンポーネントの最終版を参照してください。

### 6.3. Googleプロバイダーの設定

1.  **Google Cloud Consoleでの設定:**ok
    *   [Google Cloud Console](https://console.cloud.google.com/)にアクセスし、新しいプロジェクトを作成するか、既存のプロジェクトを選択します。
    *   `APIとサービス` > `認証情報` に移動します。
    *   `+ 認証情報を作成` > `OAuthクライアントID` を選択します。
    *   アプリケーションの種類で `ウェブアプリケーション` を選択します。

2.  **リダイレクトURIの設定:**
    *   Supabaseのダッシュボードに戻り、`Authentication` > `Providers` > `Google` を選択します。
    *   `Configuration`タブに表示されている `Redirect URL`（コールバックURL）をコピーします。（プロバイダー項目のアプリごとのところの欄にあるよ）
    *   Google Cloud Consoleの `承認済みのリダイレクトURI` に、コピーしたURLを貼り付けます。

3.  **クライアントIDとシークレットの取得と設定:**OK
    *   `作成` ボタンを押すと、`クライアントID` と `クライアントシークレット` が表示されます。これらをコピーします。
    *   SupabaseのGoogleプロバイダー設定画面に戻り、コピーした `Client ID` と `Client Secret` をそれぞれ入力し、`Save`します。
    *   最後に、Googleプロバイダーを有効（Enable）にすることを忘れないでください。

### 6.3. LINEプロバイダーの設定

1.  **LINE Developers Consoleでの設定:**
    *   [LINE Developers Console](https://developers.line.biz/ja/)にアクセスし、新規プロバイダーと `LINEログイン` チャンネルを作成します。
    *   `チャネル基本設定` タブで `チャネルID` と `チャネルシークレット` を取得します。

2.  **リダイレクトURIの設定:**
    *   Supabaseのダッシュボードに戻り、`Authentication` > `Providers` > `LINE` を選択します。
    *   `Configuration`タブに表示されている `Redirect URL`（コールバックURL）をコピーします。
    *   LINE Developers Consoleの `LINEログイン設定` タブに移動し、`コールバックURL` の欄にコピーしたURLを貼り付けて `更新` します。

3.  **チャネルIDとシークレットの設定:**
    *   SupabaseのLINEプロバイダー設定画面に戻り、取得した `チャネルID` と `チャネルシークレット` をそれぞれ `Client ID` と `Client Secret` の欄に入力し、`Save`します。
    *   最後に、LINEプロバイダーを有効（Enable）にしてください。

以上の設定が完了すると、アプリケーションのソーシャルログインが実際に機能するようになります。

