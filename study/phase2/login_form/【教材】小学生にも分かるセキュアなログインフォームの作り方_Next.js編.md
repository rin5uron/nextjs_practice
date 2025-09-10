# 【教材】Next.jsで学ぶ、セキュアなログインフォームの作り方

こんにちは！未来のスーパーエンジニアのあなたへ。

この教材では、ウェブサイトの「認証」の入り口となるログインフォームの作り方を、Next.jsというモダンなフレームワークを使って実践的に学びます。

プログラミング初心者の方でも、一つ一つのステップを丁寧に解説していきますのでご安心ください。

また、ITエンジニアの登竜門である「基本情報技術者試験」で頻出するセキュリティの重要概念も、実装と関連付けながら習得できるよう構成しています。

さあ、一緒に堅牢なログインフォームを構築し、ウェブセキュリティの基礎を身につけましょう！

---

## 1. 開発環境の準備とファイル作成

まずは、ログインフォームを実装するためのプロジェクト構造を整えます。

### 1.1. ログインページ用ディレクトリとファイルの作成

Next.jsのApp Routerの規約に従い、ログイン画面用のページを作成します。

1.  `src/app` ディレクトリ内に `login` という新しいディレクトリを作成します。
2.  作成した `login` ディレクトリ内に `page.tsx` ファイルを作成します。

**ターミナルコマンド:**

```bash
mkdir -p src/app/login
touch src/app/login/page.tsx
```

これにより、`http://localhost:3000/login` でアクセスできるページが準備されます。

---

## 2. ログインフォームのUI構築

ログインフォームの「見た目」をHTMLとCSSを使って構築します。

`src/app/login/page.tsx` に以下のコードをコピー＆ペーストしてください。

```tsx
// src/app/login/page.tsx

import styles from './LoginForm.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
    </div>
  );
}
```

### 2.1. CSSによるスタイリング

このままではシンプルな見た目なので、CSSでデザインを整えます。
`src/app/login` ディレクトリ内に `LoginForm.module.css` ファイルを作成し、以下のコードを貼り付けてください。

**ターミナルコマンド:**

```bash
touch src/app/login/LoginForm.module.css
```

**`src/app/login/LoginForm.module.css` の内容:**

```css
/* src/app/login/LoginForm.module.css */

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 画面全体の高さを確保 */
  background-color: #f0f2f5;
  padding: 20px; /* 余白を追加 */
  box-sizing: border-box; /* パディングを含めて要素の幅を計算 */
}

.title {
  font-size: 2.5rem; /* フォントサイズを少し大きく */
  color: #333;
  margin-bottom: 2.5rem; /* 余白を調整 */
  text-align: center;
}

.form {
  padding: 2.5rem; /* パディングを調整 */
  background-color: white;
  border-radius: 10px; /* 角を丸く */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* 影を強調 */
  width: 100%;
  max-width: 450px; /* 最大幅を少し広く */
}

.inputGroup {
  margin-bottom: 1.8rem; /* 余白を調整 */
}

.inputGroup label {
  display: block;
  margin-bottom: 0.6rem; /* 余白を調整 */
  font-weight: 600; /* フォントの太さを調整 */
  color: #444;
  font-size: 1.05rem; /* フォントサイズを調整 */
}

.inputGroup input {
  width: calc(100% - 20px); /* パディング分を考慮 */
  padding: 0.8rem 10px; /* パディングを調整 */
  border: 1px solid #ddd; /* 枠線を調整 */
  border-radius: 6px; /* 角を丸く */
  font-size: 1.05rem; /* フォントサイズを調整 */
  transition: border-color 0.2s ease-in-out; /* ホバー時のアニメーション */
}

.inputGroup input:focus {
  outline: none;
  border-color: #007bff; /* フォーカス時の色 */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); /* フォーカス時の影 */
}

.button {
  width: 100%;
  padding: 0.9rem; /* パディングを調整 */
  background-color: #007bff; /* ボタンの色を調整 */
  color: white;
  border: none;
  border-radius: 6px; /* 角を丸く */
  font-size: 1.1rem; /* フォントサイズを調整 */
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out; /* アニメーションを追加 */
}

.button:hover {
  background-color: #0056b3; /* ホバー時の色 */
  transform: translateY(-2px); /* 少し浮き上がるアニメーション */
}

.button:active {
  transform: translateY(0); /* クリック時のアニメーション */
}
```

ここまでできたら、開発サーバーを起動してブラウザで確認してみましょう。

**ターミナルコマンド:**

```bash
bun dev
```

ブラウザで `http://localhost:3000/login` を開いて、デザインが適用されているか確認してください。

---

## 3. フォーム入力値の管理

現在のフォームでは、ユーザーが入力した内容をJavaScriptで取得・管理できません。
Reactの `useState` フックを使って、入力されたメールアドレスとパスワードをコンポーネントの「状態」として管理できるようにします。

`src/app/login/page.tsx` を以下のように更新してください。

```tsx
// src/app/login/page.tsx
"use client"; // このディレクティブは、このコンポーネントがクライアントサイドで実行されることを示します。

import { useState } from 'react'; // ReactのuseStateフックをインポート
import styles from './LoginForm.module.css';

export default function LoginPage() {
  // useStateを使って、emailとpasswordの状態変数とその更新関数を定義
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // フォーム送信時のハンドラ関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルトの送信動作（ページリロード）を防ぐ
    alert(`入力された情報:\nメールアドレス: ${email}\nパスワード: ${password}`);
    // ここに後で「サーバーへのデータ送信」処理を実装します
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      {/* onSubmitイベントにhandleSubmit関数を設定 */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">メールアドレス</label>
          {/* input要素のvalueとonChangeを状態変数と紐付け */}
          <input
            type="email"
            id="email"
            name="email"
            value={email} // email状態変数の値を表示
            onChange={(e) => setEmail(e.target.value)} // 入力値が変更されるたびにemail状態を更新
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">パスワード</label>
          {/* input要素のvalueとonChangeを状態変数と紐付け */}
          <input
            type="password"
            id="password"
            name="password"
            value={password} // password状態変数の値を表示
            onChange={(e) => setPassword(e.target.value)} // 入力値が変更されるたびにpassword状態を更新
            required
          />
        </div>
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
    </div>
  );
}
```

### 解説:

*   **`"use client";`**: Next.jsのApp Routerでは、デフォルトでサーバーコンポーネントとして扱われます。`useState`のようなクライアントサイドの機能を使用するには、ファイルの先頭にこのディレクティブを記述する必要があります。
*   **`useState`**: コンポーネント内で状態を管理するためのReactフックです。`[state変数, stateを更新する関数] = useState(初期値)` の形式で使用します。
*   **`onChange` イベント**: `input` 要素の値が変更されるたびに発火し、`setEmail` や `setPassword` を呼び出して対応する状態変数を更新します。
*   **`value` プロパティ**: `input` 要素の表示値を対応する状態変数と紐付けます。これにより、Reactがフォームの入力値を完全に制御する「制御されたコンポーネント」となります。
*   **`handleSubmit` 関数**: フォームが送信された際（ログインボタンがクリックされた際）に実行されます。`e.preventDefault()` は、フォームのデフォルトの送信動作（ページのリロード）を防ぐために重要です。

実際にメールアドレスとパスワードを入力し、ログインボタンをクリックすると、入力内容がアラートで表示されることを確認してください。

---

## 4. 【セキュリティ基礎講座】ウェブアプリケーションの安全を守るために

ログインフォームは、ユーザー認証というセキュリティ上非常に重要な役割を担っています。ここでは、基本情報技術者試験でも問われる、ウェブアプリケーションのセキュリティに関する主要な概念を学びましょう。

### 4.1. ハッシュ化 (Hashing)

**概要:**
パスワードなどのデータを、元の形に戻せない一方向の固定長文字列（ハッシュ値）に変換する処理です。

**重要性:**
もしデータベースからパスワード情報が漏洩した場合でも、ハッシュ化されていれば元のパスワードが直接知られることはありません。パスワードは絶対に平文（そのままの形）で保存してはいけません。

**基本情報技術者試験関連用語:**
*   **一方向関数 (One-way function)**: ハッシュ化に用いられる関数で、計算は容易だが逆算が非常に困難な特性を持つ。
*   **ソルト (Salt)**: ハッシュ化の際に、パスワードに付加するランダムなデータ。同じパスワードでも異なるハッシュ値になるようにし、レインボーテーブル攻撃などを防ぐ。

### 4.2. SQLインジェクション (SQL Injection)

**概要:**
データベースへの問い合わせ（SQL文）を生成する際に、ユーザーからの入力値を適切に処理しないことで、攻撃者が意図しないSQL文を実行させる攻撃です。

**重要性:**
この攻撃が成功すると、データベース内の機密情報（ユーザー情報、クレジットカード情報など）の窃取、改ざん、削除、さらにはシステム全体の乗っ取りにつながる可能性があります。

**基本情報技術者試験関連用語と対策:**
*   **プリペアドステートメント (Prepared Statement)**: SQL文のテンプレートとパラメータを分離してデータベースに渡し、パラメータをデータとしてのみ扱うことで、SQLインジェクションを防ぐ最も効果的な対策。
*   **エスケープ処理 (Escaping)**: ユーザー入力に含まれるSQLにとって特別な意味を持つ文字（例: `'`, `;`, `--`）を無害化する処理。プリペアドステートメントが推奨されるが、代替手段として用いられることもある。

### 4.3. クロスサイトスクリプティング (XSS / Cross-Site Scripting)

**概要:**
ウェブサイトの入力フォームやURLパラメータなどを介して、悪意のあるスクリプト（JavaScriptなど）をウェブページに埋め込み、そのページを閲覧した他のユーザーのブラウザで実行させる攻撃です。

**重要性:**
攻撃が成功すると、ユーザーのセッションクッキー（ログイン状態を維持する情報）の窃取、偽のフォーム表示による個人情報詐取、ウェブサイトの改ざんなどが行われる可能性があります。

**基本情報技術者試験関連用語と対策:**
*   **サニタイジング (Sanitizing)**: ユーザー入力に含まれるHTMLタグやJavaScriptコードを無害化（除去またはエスケープ）する処理。
*   **エスケープ処理 (Escaping)**: `<` を `&lt;` のように、HTMLにとって特別な意味を持つ文字を別の表現に変換し、スクリプトとして解釈されないようにする処理。

### 4.4. HTTPS (Hypertext Transfer Protocol Secure)

**概要:**
HTTP通信にSSL/TLSプロトコルを組み合わせることで、ウェブブラウザとウェブサーバー間の通信を暗号化し、盗聴、改ざん、なりすましを防ぐ仕組みです。

**重要性:**
ログイン情報（ユーザー名、パスワード）やクレジットカード情報などの機密性の高いデータをインターネット上で安全に送受信するために不可欠です。HTTPSを使用しないHTTP通信では、これらの情報が第三者に容易に盗聴される危険性があります。

**基本情報技術者試験関連用語:**
*   **SSL/TLS (Secure Sockets Layer / Transport Layer Security)**: 通信を暗号化するためのプロトコル。
*   **公開鍵暗号方式 (Public-key cryptography)**: 暗号化と復号に異なる鍵（公開鍵と秘密鍵）を使用する暗号方式。
*   **共通鍵暗号方式 (Symmetric-key cryptography)**: 暗号化と復号に同じ鍵を使用する暗号方式。HTTPSでは、通信開始時に公開鍵暗号方式で共通鍵を安全に共有し、その後のデータ通信は高速な共通鍵暗号方式で行われる。
*   **デジタル証明書 (Digital Certificate)**: ウェブサイトの運営者が正当なものであることを証明し、公開鍵の信頼性を保証するもの。

---

## 5. サーバーサイドとの連携 (APIルートの実装)

最後に、入力された認証情報を「サーバー」に送信し、認証処理を行う方法を学びます。Next.jsでは、サーバーサイドの処理を簡単に記述できる「APIルート」を提供しています。

### 5.1. ログインAPIルートの作成

ユーザーからのログインリクエストを受け付けるAPIエンドポイントを作成します。

1.  `src/app` ディレクトリ内に `api` という新しいディレクトリを作成します。
2.  `api` ディレクトリ内に `login` という新しいディレクトリを作成します。
3.  `login` ディレクトリ内に `route.ts` ファイルを作成します。

**ターミナルコマンド:**

```bash
mkdir -p src/app/api/login
touch src/app/api/login/route.ts
```

**`src/app/api/login/route.ts` の内容:**

```typescript
// src/app/api/login/route.ts

import { NextResponse } from 'next/server';

// POSTリクエストを処理する関数
export async function POST(request: Request) {
  try {
    // リクエストボディからメールアドレスとパスワードを取得
    const { email, password } = await request.json();

    // --- ここが認証ロジックの核心部分です ---
    // 本来はここでデータベースに保存されたユーザー情報と照合します。
    // 例: ユーザーIDとハッシュ化されたパスワードをデータベースから取得し、
    // 入力されたパスワードをハッシュ化して比較する。
    //
    // 今回は学習のため、特定のメールアドレスとパスワードでのみログイン成功とします。
    if (email === 'test@example.com' && password === 'password123') {
      // 認証成功の場合
      return NextResponse.json({ message: 'ログイン成功！' });
    } else {
      // 認証失敗の場合
      // HTTPステータスコード401 (Unauthorized) を返すのが一般的です。
      return NextResponse.json({ message: 'メールアドレスまたはパスワードが違います。' }, { status: 401 });
    }
  } catch (error) {
    // エラーハンドリング
    console.error('APIエラー:', error);
    return NextResponse.json({ message: 'サーバーエラーが発生しました。' }, { status: 500 });
  }
}
```

### 5.2. フロントエンドからのAPI呼び出し

`src/app/login/page.tsx` の `handleSubmit` 関数を更新し、作成したAPIルートに認証情報を送信するようにします。

**`src/app/login/page.tsx` の `handleSubmit` 関数を以下のように書き換える:**

```tsx
// src/app/login/page.tsx の handleSubmit 関数

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ
    
    try {
      // /api/login エンドポイントへPOSTリクエストを送信
      const response = await fetch('/api/login', {
        method: 'POST', // HTTPメソッドはPOST
        headers: {
          'Content-Type': 'application/json', // リクエストボディの形式はJSON
        },
        // メールアドレスとパスワードをJSON形式で送信
        body: JSON.stringify({ email, password }),
      });

      // サーバーからのレスポンスをJSONとしてパース
      const data = await response.json();

      if (response.ok) { // HTTPステータスコードが2xxの場合（成功）
        alert(`ログイン成功: ${data.message}`);
        // 成功後、ダッシュボードページなどへリダイレクトする処理をここに記述
        // 例: window.location.href = '/dashboard';
      } else { // HTTPステータスコードが2xx以外の場合（失敗）
        alert(`ログイン失敗: ${data.message}`);
      }
    } catch (error) {
      // ネットワークエラーなど、通信自体に問題があった場合
      console.error('通信エラー:', error);
      alert('通信中にエラーが発生しました。ネットワーク接続を確認してください。');
    }
  };
```

### 動作確認:

1.  開発サーバーが起動していることを確認してください (`bun dev`)。
2.  ブラウザで `http://localhost:3000/login` を開きます。
3.  メールアドレスに `test@example.com`、パスワードに `password123` を入力してログインボタンをクリックします。「ログイン成功！」のアラートが表示されるはずです。
4.  それ以外の情報を入力してログインボタンをクリックします。「メールアドレスまたはパスワードが違います。」のアラートが表示されるはずです。

これで、フロントエンド（ユーザーインターフェース）とバックエンド（認証ロジック）が連携する、より実践的なログイン処理が完成しました！

---

## まとめ

お疲れ様でした！

あなたは今日、単なるログインフォームの作成だけでなく、ウェブアプリケーションの「安全性」を意識した開発の第一歩を踏み出しました。

*   **Next.js (App Router)** を使ったページとAPIルートの作成
*   **HTML/CSS** によるUIの構築とスタイリング
*   **React (useState)** によるフォーム入力値の管理
*   **APIルート** を用いたサーバーサイドとの通信実装
*   **ハッシュ化、SQLインジェクション、XSS、HTTPS** といった基本情報技術者試験にも役立つ重要なセキュリティ概念の理解

この教材で学んだ知識は、今後のあなたのエンジニアとしてのキャリアにおいて非常に重要な基礎となります。

ここからさらに、
*   「実際にユーザー登録機能を実装するには？」
*   「SupabaseやFirebaseのような認証サービスと連携するには？」
*   「パスワードのリセット機能はどう作る？」

といった、より高度なテーマにも挑戦してみてください。

今日の経験を活かし、これからも素晴らしいものづくりに挑戦し続けてください。応援しています！