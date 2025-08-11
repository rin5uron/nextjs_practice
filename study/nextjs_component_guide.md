# Next.js 超入門：はじめてのコンポーネント作成ガイド

☑️実践完了日：(ここに日付を入れましょう)
<br>
---
こんにちは！このガイドでは、Next.jsでウェブサイトを作る上で欠かせない「コンポーネント」という考え方と、その作り方を一緒に学んでいきましょう。一歩ずつ進めていくので、安心してくださいね。

## 0. コンポーネントって、一体なに？

難しく考えなくて大丈夫です。**コンポーネントとは、ウェブサイトを構成する「部品」**のことです。

レゴブロックを想像してみてください。色々な形のブロックを組み合わせて、家や車を作りますよね。ウェブサイトも同じで、
*   「ヘッダー」（サイトの上部にあるメニュー）
*   「フッター」（サイトの下部にあるコピーライトなど）
*   「ボタン」
*   「記事カード」

といった小さな「部品（コンポーネント）」を組み合わせて、一つのページが作られています。

**なぜ部品化するの？**
*   **使い回しができる:** 一度「ボタン」部品を作れば、どのページでも同じボタンが使えます。
*   **修正がラク:** ボタンのデザインを変えたい時、部品を1つ直せば、サイト全体のボタンが一瞬で変わります。とても便利です！

## 1. 部品の置き場所を準備しよう

まずは、作った部品をしまっておくための「箱」を準備します。Next.jsでは、`src/components` というフォルダを部品の収納場所にするのが一般的です。

今回は「ヘッダー」というレイアウトに関する部品を作るので、`src/components/layout` という場所を使いましょう。

**ステップ 1: フォルダとファイルを作る**

`src/components/layout` ディレクトリに、`Header.tsx` というファイルを作成します。
（`.tsx` は、HTMLのようなコードとプログラムのコードを一緒に書ける、特殊なファイル形式だと思ってください）

```bash
# もし layout フォルダがなければ、下のコマンドで作成します
mkdir -p src/components/layout

# 次に、Header.tsx ファイルを作成します
touch src/components/layout/Header.tsx
```

これで、ヘッダー部品を書き込むための、空っぽのファイルが準備できました。

## 2. ヘッダー部品を少しずつ作ってみよう！

いよいよコーディングです。先ほど作った `Header.tsx` ファイルに、少しずつコードを書き加えていきましょう。

**ステップ 1: 部品の「骨格」を作る**

まず、これが「ヘッダーという名前の部品ですよ」と宣言するための、基本の形を書きます。

```tsx
// src/components/layout/Header.tsx

// これが部品の基本形です
export default function Header() {
  return (
    // ここに見た目を書いていきます
  );
}
```
*   `export default function Header() { ... }`
    *   `Header` という名前の関数（機能のかたまり）を作っています。これがコンポーネントの本体になります。
    *   `export default` は、「このファイルを他の場所で使えるように公開しますよ」というおまじないです。

**ステップ 2: ヘッダーの見た目をHTMLのように書く**

`return ()` の中に、ヘッダーの見た目を書いていきます。HTMLとほとんど同じように書けるので、直感的で分かりやすいはずです。

```tsx
// src/components/layout/Header.tsx

export default function Header() {
  return (
    <header>
      <nav>
        <div>
          My Next.js Site
        </div>
        <ul>
          <li>ホーム</li>
          <li>お知らせ</li>
          <li>商品紹介</li>
          <li>プロフィール</li>
        </ul>
      </nav>
    </header>
  );
}
```
*   `<header>` や `<ul>`, `<li>` など、見慣れたHTMLタグが使えますね。このようにHTMLに似た書き方を **JSX** と呼びます。

**ステップ 3: ページを移動できる「リンク」を設置する**

普通のHTMLでは `<a>` タグを使いますが、Next.jsでは特別な `<Link>` という部品を使います。これを使うと、ページ移動がとても速くなるというメリットがあります。

```tsx
// src/components/layout/Header.tsx

// ★ まず、Link部品を使えるように読み込みます
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <div>
          {/* ★ 文字をLink部品で囲みます */}
          <Link href="/">
            My Next.js Site
          </Link>
        </div>
        <ul>
          {/* ★ 他のメニューも同様に */}
          <li><Link href="/">ホーム</Link></li>
          <li><Link href="/news">お知らせ</Link></li>
          <li><Link href="/products">商品紹介</Link></li>
          <li><Link href="/profile">プロフィール</Link></li>
        </ul>
      </nav>
    </header>
  );
}
```
*   `import Link from 'next/link';`
    *   Next.jsが用意してくれている `Link` という部品を、このファイルで使いますよ、という宣言です。
*   `<Link href="/">`
    *   `href` に指定したページへ移動するリンクになります。`href="/"` はトップページを指します。

**ステップ 4: スタイルを付けて見た目を整える（完成！）**

最後に、`style` を使って簡単に見栄えを良くしましょう。

```tsx
// src/components/layout/Header.tsx (完成形)

import Link from 'next/link';

export default function Header() {
  return (
    // headerに枠線をつけます
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      {/* navの中身を横並びにします */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
            My Next.js Site
          </Link>
        </div>
        {/* ulの中身を横並びにします */}
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><Link href="/">ホーム</Link></li>
          <li><Link href="/news">お知らせ</Link></li>
          <li><Link href="/products">商品紹介</Link></li>
          <li><Link href="/profile">プロフィール</Link></li>
        </ul>
      </nav>
    </header>
  );
}
```
*   `style={{...}}`: JSXでスタイルを指定する時の書き方です。`{{ }}` と波括弧が二重になるのが特徴です。（外側の `{}` は「ここからプログラムのコードが始まりますよ」という印、内側の `{}` はCSSのプロパティをまとめるためのオブジェクトです）

これで、再利用可能なヘッダー部品の完成です！

## 3. 作った部品をページに設置しよう

部品は作っただけでは表示されません。サイトの「設計図」に、「ここにヘッダーを置いてください」と指示を出す必要があります。

Next.jsのサイト全体の設計図は `src/app/layout.tsx` というファイルです。

**ステップ 1: `layout.tsx` を開いてヘッダーを読み込む**

まず、先ほど作った `Header` 部品を `layout.tsx` で使えるように `import` します。

```tsx
// src/app/layout.tsx の上の方に追記

import Header from '@/components/layout/Header';
```
*   `@/` は `src` ディレクトリを指す便利なショートカットです。

**ステップ 2: 設計図にヘッダーを配置する**

`<body>` タグの中に `<Header />` と書き加えます。これで、全てのページの `<body>` の一番上にヘッダーが表示されるようになります。

```tsx
// src/app/layout.tsx を修正

// ... (import文など)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header /> {/* ★ ここにヘッダー部品を配置！ */}
        
        {/* ↓ この children が各ページの中身に置き換わります */}
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
```
*   `{children}`: ここが少し難しいかもしれませんが、「各ページ（`page.tsx`）の中身が、そっくりそのままここに入りますよ」という目印だと思ってください。

## 4. ブラウザで確認しよう！

お疲れ様でした！これで準備は完了です。

開発サーバーを起動 (`pnpm dev`) して、`http://localhost:3000` にアクセスしてみてください。
トップページや、お知らせページ、プロフィールページなど、どのページに移動しても画面の上に共通のヘッダーが表示されていれば、大成功です！

---
**次に進む前に:**
このガイドで分からなかったこと、もっと知りたいことはありましたか？部品化の考え方はとても重要なので、焦らずゆっくり、あなたのペースで進んでいきましょう。