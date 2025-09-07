# Next.js(React)とTypeScriptの基礎

このガイドは、あなたがNext.jsを使いこなすために必要な「React」と「TypeScript」の基本的な考え方を、10日間で少しずつ学べるように設計されています。

---

### Day 1: JSXとは？ - JavaScriptとHTMLの出会い

まず、`login/page.tsx` の中に書かれていた、HTMLのようなコードの正体から学びましょう。

```tsx
<div className="container">
  <h1>ログイン</h1>
</div>
```

これは **JSX** と呼ばれる書き方です。見た目はHTMLですが、実際にはJavaScriptの一種です。Next.jsで使われているReactというライブラリでは、このJSXを使って画面の見た目（UI）を構築します。

**今日のポイント:** Reactでは、HTMLのように見える **JSX** という書き方でUIを作る。

---

### Day 2: JSXの基本ルール

JSXはHTMLとそっくりですが、いくつか重要な違いがあります。今日は2つだけ覚えましょう。

1.  **`class` は `className` と書く**
    HTMLでは `<div class="..."` と書きますが、JSXでは `<div className="..."` と書きます。`class` はJavaScriptで特別な意味を持つ単語（予約語）のため、区別するために `className` を使います。

2.  **`{}` でJavaScriptを埋め込める**
    JSXの中で `{}` を使うと、その中にJavaScriptの変数や簡単な計算式を埋め込むことができます。

    ```tsx
    const name = "山田";
    // h1タグの中に、JavaScriptのname変数が埋め込まれる
    <h1>{name}さん、こんにちは</h1> 
    ```

**今日のポイント:** JSXでは `class` は `className` と書く。`{}` を使えばJSを埋め込める。

---

### Day 3: コンポーネントとは？ - UIの部品

`LoginPage` も「コンポーネント」の一種です。コンポーネントとは、UIを構成する再利用可能な「部品」のことです。

Reactでは、コンポーネントを **返す関数** として定義します。

```tsx
// "Header" という名前のコンポーネント
function Header() {
  // この関数は、UIの部品としてヘッダーのJSXを返す
  return (
    <header>
      <h1>マイページ</h1>
    </header>
  );
}
```

`LoginPage` も、ログインページのUI部品を返す一つの大きな関数だった、というわけです。

**今日のポイント:** コンポーネントとは、UIの「部品」。実体はJSXを返すJavaScriptの関数。

---

### Day 4: なぜ「状態(State)」が必要？

ユーザーの操作によって内容が変化するUIを作るには、「状態（State）」という考え方が必要です。状態とは、コンポーネントが持つ「記憶」のようなものです。

例えば、ログインフォームでは、「ユーザーが入力したメールアドレス」をコンポーネントに記憶させておく必要があります。この「記憶」が状態です。

**今日のポイント:** ユーザーの操作に応じて変化するUIを作るには、コンポーネントに「状態（記憶）」を持たせる必要がある。

---

### Day 5: `useState` を使ってみる

Reactで「状態」を作るための道具が `useState` です。これはReactから `import` して使います。

書き方には特徴があります。

```tsx
import { useState } from 'react';

// useStateを使って状態（state）を定義
const [email, setEmail] = useState('');
```

- `useState('')` は、「`email` という状態の初期値は空文字列です」という意味。
- `email`: 状態の現在の値を保持する変数（読み取り専用）。
- `setEmail`: 状態を更新するための専用関数。

**今日のポイント:** `useState` は、[現在の値, 更新用の関数] のペアを作るReactの道具。

---

### Day 6: `useState`と入力フォームを結びつける

`useState` で作った状態を、実際の `<input>` タグと結びつけます。`value` と `onChange` の2つを使います。

```tsx
const [email, setEmail] = useState('');

<input
  type="email"
  // 1. inputに表示する値を、状態変数emailに設定
  value={email}
  // 2. inputの内容が変更されたら、setEmail関数を呼び出して状態を更新
  onChange={(e) => setEmail(e.target.value)}
/>
```

これで、ユーザーが入力した文字がリアルタイムで `email` 状態に記憶されるようになります。

**今日のポイント:** `value` と `onChange` を使って、`input` と `useState` を結びつける。

---

### Day 7: イベントを処理する

ボタンのクリックなど、ユーザーのアクションを「イベント」と呼びます。JSXでは、`onClick` や `onSubmit` といった属性で、イベントが発生したときに実行する関数を指定します。

```tsx
const handleSubmit = () => {
  alert("フォームが送信されました！");
};

<form onSubmit={handleSubmit}>
  <button type="submit">送信</button>
</form>
```

`LoginPage` では、`form` が `onSubmit` された（送信された）ときに `handleSubmit` 関数が実行されるようになっていました。

**今日のポイント:** `onClick` や `onSubmit` を使って、ユーザーのアクションに対応する関数を呼び出す。

---

### Day 8: TypeScriptとは？

あなたは「これってTypeScript？」と気づかれましたね。その通りです。Next.jsはTypeScriptを標準でサポートしています。

TypeScriptは、JavaScriptに「型」というルールを追加したものです。例えば、変数名の後ろに `: string` と書くことで、「この変数には文字列しか入れてはいけません」と明示できます。

```ts
let message: string = "こんにちは";
message = 123; // エラー！ string型の変数にnumber型は代入できない
```

これにより、多くのバグを事前に防ぐことができ、コードが安全になります。

**今日のポイント:** TypeScriptは、JavaScriptに「型」のルールを追加して、コードをより安全にするためのもの。

---

### Day 9: TypeScriptをイベントで使う

`handleSubmit` 関数の引数にあった、この不思議な記述を解読しましょう。

```ts
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  // ...
}
```

これは、「`handleSubmit` 関数の引数 `e` は、HTMLのフォーム要素 (`HTMLFormElement`) で発生したReactのフォームイベント (`React.FormEvent`) ですよ」という**型注釈**です。

こう書くことで、`e` の中で使えるプロパティ（例えば `e.preventDefault()` など）の候補をエディタが示してくれるようになり、コーディングが非常に楽になります。

**今日のポイント:** 引数に型を付けることで、エディタの補助機能が使え、ミスが減る。

---

### Day 10: 総復習 - `LoginPage`を完全に理解する

お疲れ様でした！最終日です。これまでの知識を使って、`LoginPage` のコードをもう一度見てみましょう。

```tsx
"use client"; // Day4: 状態(useState)を使うのでクライアントコンポーネント宣言

import { useState } from 'react'; // Day5: 状態を管理するuseStateをインポート
import styles from './LoginForm.module.css'; // CSSをインポート

// Day3: LoginPageコンポーネントの定義
export default function LoginPage() {
  // Day5: emailとpasswordの状態を定義
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Day7, Day9: フォーム送信イベントの処理関数。引数eに型を指定
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`入力された情報:\nメールアドレス: ${email}\nパスワード: ${password}`);
  };

  // Day1, Day2: JSXでUIを返す
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">メールアドレス</label>
          {/* Day6: inputと状態を結びつける */}
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* (passwordも同様) */}
        <div className={styles.inputGroup}>
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
```

これで、以前は「分からない書き方」だったコードが、一つ一つの意味を持つ部品の集まりに見えてきたのではないでしょうか。この調子で、少しずつ慣れていきましょう！

