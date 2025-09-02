# 【教材】小学生にも分かる！Next.jsで作る、安全なログインフォームの教科書

こんにちは！未来のスーパーエンジニアのキミへ。

この教材は、ウェブサイトの「カギ」となるログインフォームの作り方を、Next.jsという人気の技術を使いながら学んでいくためのものです。

「プログラミングって難しそう…」と思っているキミも大丈夫！
まるで図工の授業で何かを作るように、一つ一つゆっくり進めていくからね。

また、ITエンジニアの国家試験「基本情報技術者試験」に出てくるような、インターネットの安全を守るための大事な知識（セキュリティ）も一緒に学べるようになっています。

さあ、一緒に最高のログインフォームを作ってみよう！

---

## 1時間目：準備をしよう！

まずは、ログインフォームを作るための場所を準備します。

### 1. ログインページ用のファイルを作ろう

キミのプロジェクトの中に、ログイン画面専用のページを作ります。

1.  `src/app` フォルダの中に `login` という名前の新しいフォルダを作ってください。
2.  その `login` フォルダの中に `page.tsx` というファイルを作ります。

これで、 `http://localhost:3000/login` にアクセスすると表示されるページが準備できました。

---

## 2時間目：見た目を作ってみよう！

ログインフォームの「見た目」をHTMLとCSSを使って作っていきます。
`src/app/login/page.tsx` に下のコードをコピーして貼り付けてみよう。

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

### CSSで見た目を整えよう

このままだと、ちょっと見た目がさみしいので、CSSでかっこよくします。
`src/app/login` フォルダの中に `LoginForm.module.css` というファイルを作って、下のコードを貼り付けてください。

```css
/* src/app/login/LoginForm.module.css */

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
}

.form {
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.inputGroup {
  margin-bottom: 1.5rem;
}

.inputGroup label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.inputGroup input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.button {
  width: 100%;
  padding: 0.75rem;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #005bb5;
}
```

ここまでできたら、一度 `bun dev` コマンドで開発サーバーを起動して、ブラウザで `http://localhost:3000/login` を開いてみよう。かっこいいログインフォームが表示されたかな？

---

## 3時間目：入力された文字をコンピューターに記憶させよう

今のままでは、文字を入力してもコンピューターはそれを覚えてくれません。
Reactの `useState` という魔法の呪文を使って、入力されたメールアドレスとパスワードを記憶させましょう。

`src/app/login/page.tsx` を下のように書き換えてください。

```tsx
// src/app/login/page.tsx
"use client"; // ← これを一番上に追加！

import { useState } from 'react'; // ← これを追加！
import styles from './LoginForm.module.css';

export default function LoginPage() {
  // useStateを使って、emailとpasswordを記憶する箱を用意
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // フォームのデフォルトの送信を防ぐ
    alert(`メールアドレス: ${email}
パスワード: ${password}`);
    // ここに後で「サーバーに情報を送る」処理を書く
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      {/* handleSubmit関数をformのonSubmitに設定 */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">メールアドレス</label>
          {/* 入力されるたびにsetEmailが呼ばれ、emailの箱の中身が更新される */}
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">パスワード</label>
          {/* 入力されるたびにsetPasswordが呼ばれ、passwordの箱の中身が更新される */}
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>ログイン</button>
      </form>
    </div>
  );
}
```

### やってみよう！

1.  `"use client";` をファイルの先頭に追加しました。これは、「この部品はユーザーのブラウザ（クライアント）で動きますよ」という合図です。`useState` のような魔法は、この合図がある場所でしか使えません。
2.  `useState` で `email` と `password` という名前の「記憶の箱」を用意しました。
3.  `input` タグに `value` と `onChange` を追加しました。
    *   `onChange`: ユーザーがキーボードで文字を打つたびに、`useState` の箱の中身を更新します。
    *   `value`: `useState` の箱の中身を画面に表示します。
4.  `form` タグに `onSubmit` を追加しました。ログインボタンが押されたときに `handleSubmit` という関数が実行されます。
5.  `handleSubmit` の中では、とりあえず `alert` で入力内容が表示されるようにしています。

実際に文字を入力してログインボタンを押すと、入力した内容がアラートで表示されるはずです。

---

## 4時間目：【セキュリティ講座】ウェブサイトの安全を守る合言葉

ログインフォームは、ウェブサイトの安全を守るためのとても大事な場所。
ここで、悪い人（ハッカー）に侵入されないための技術を学びましょう。
これは「基本情報技術者試験」でも問われる超重要知識です！

### 1. ハッシュ化 (Hashing)

**これは何？**
パスワードを、元の形に戻せないグチャグチャの文字列に変換すること。

**たとえるなら…**
「りんご」という言葉を、絶対に解読できない暗号「`x4$a@p!`」に変換する魔法の箱のようなものです。この魔法の箱は、同じ「りんご」を入れれば必ず同じ「`x4$a@p!`」が出てきますが、「`x4$a@p!`」から「りんご」に戻すことは誰にもできません。

**なぜ大事？**
もし会社のデータベースからパスワードが盗まれても、ハッシュ化されていれば、元のパスワードが何だったのか悪い人には分かりません。だから、パスワードは絶対に「そのまま」保存してはいけません。

### 2. SQLインジェクション (SQL Injection)

**これは何？**
データベースに命令を出す言語「SQL」を、入力フォームにこっそり注入（inject）して、データベースを不正に操作する攻撃。

**たとえるなら…**
図書館の検索コンピューターで「夏目漱石の本」と検索すべきところを、「夏目漱石の本' OR '1'='1」のように、システムの意図しない特別な命令文を入力するようなものです。すると、コンピューターが勘違いして、貸出禁止の貴重な本まで含めて、すべての本のリストを表示してしまうかもしれません。

**なぜ大事？**
これをされると、登録されているユーザーの個人情報が全部盗まれたり、データを全部消されたりする可能性があります。対策としては、入力された文字を「ただの文字列」として扱い、特別な命令として解釈させないようにする（**プリペアドステートメント**や**エスケープ処理**）ことが重要です。

### 3. クロスサイトスクリプティング (XSS / Cross-Site Scripting)

**これは何？**
ウェブサイトの入力フォームに、悪意のあるプログラム（スクリプト）を埋め込み、他のユーザーのブラウザで実行させる攻撃。

**たとえるなら…**
みんなが見る掲示板に、「これをクリックすると面白いサイトが見れるよ！」と書いて、実はクリックした人の情報を盗む罠を仕掛けておくようなものです。

**なぜ大事？**
他のユーザーがそのページを見たときに、埋め込まれたプログラムが勝手に実行されて、個人情報（クッキーなど）が盗まれてしまう可能性があります。対策としては、ユーザーが入力した内容を画面に表示する際に、`<script>`のような特別な意味を持つ文字を無害化（**サニタイズ**）することが重要です。

### 4. HTTPS (Hypertext Transfer Protocol Secure)

**これは何？**
キミのブラウザと、ウェブサイトのサーバーとの間の通信を暗号化する仕組み。

**たとえるなら…****
普通の通信（HTTP）が「ハガキ」で手紙を送るようなものだとすれば、HTTPSは「カギのかかった金庫」で手紙を送るようなものです。途中で誰かに盗み見られても、中身を読むことはできません。

**なぜ大事？**
ログインフォームで入力したパスワードが、もし暗号化されていないHTTP通信で送られたら、途中で悪い人に盗み見られてしまうかもしれません。URLが `http://` ではなく `https://` で始まっているサイトは、このHTTPSを使っているので安全です。

---

## 5時間目：サーバーと通信しよう！

最後に、入力された情報を「サーバー」と呼ばれるコンピューターに送る方法を学びます。
Next.jsでは、このサーバーの役割を果たすプログラム（APIルート）を簡単に作れます。

### 1. ログインAPIを作ろう

1.  `src/app` フォルダの中に `api` というフォルダを作ります。
2.  `api` フォルダの中に `login` というフォルダを作ります。
3.  `login` フォルダの中に `route.ts` というファイルを作って、下のコードを貼り付けます。

```ts
// src/app/api/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // フロントエンドから送られてきた情報を取得
    const { email, password } = await request.json();

    // ★★★ 本来はここでデータベースと照合する ★★★
    // ここでは、簡単にするために特定のメアドとパスワードだけでログイン成功とする
    if (email === 'test@example.com' && password === 'password123') {
      // ログイン成功！
      return NextResponse.json({ message: 'ログイン成功！' });
    } else {
      // ログイン失敗...
      return NextResponse.json({ message: 'メールアドレスまたはパスワードが違います。' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'エラーが発生しました。' }, { status: 500 });
  }
}
```

### 2. フロントエンドからAPIを呼び出そう

`src/app/login/page.tsx` の `handleSubmit` 関数を書き換えて、さっき作ったAPIに情報を送るようにします。

```tsx
// src/app/login/page.tsx の handleSubmit 関数を書き換える

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ログイン成功
        alert(`サーバーからの返事: ${data.message}`);
        // ここで、ログイン後のページに移動させる処理などを書く
        // window.location.href = '/dashboard';
      } else {
        // ログイン失敗
        alert(`エラー: ${data.message}`);
      }
    } catch (error) {
      alert('通信に失敗しました。');
    }
  };
```

### やってみよう！

1.  `test@example.com` と `password123` を入力してログインボタンを押してみよう。「ログイン成功！」と表示されるはずです。
2.  それ以外の情報を入力してログインボタンを押してみよう。「メールアドレスまたはパスワードが違います。」と表示されるはずです。

これで、フロントエンド（見た目）とバックエンド（裏側の処理）が連携する、本物に近いログイン処理が完成しました！

---

## まとめ

お疲れ様でした！
キミは今日、ただのログインフォームではなく、「安全」を意識したログインフォームの作り方の第一歩を学びました。

-   **HTML/CSS** で見た目を作り、
-   **React (useState)** でユーザーの入力を扱えるようになり、
-   **APIルート** を作ってサーバーとの通信を実装し、
-   **ハッシュ化** や **XSS** などの重要な **セキュリティ** の知識も学びました。

ここからさらに、
「実際にユーザー登録できるようにするにはどうすればいい？」
「SupabaseやFirebaseみたいな本物のデータベースと繋ぐには？」
といった新しい冒険が待っています。

今日の経験をバネにして、もっとすごいものづくりに挑戦していってください。応援しています！
