# Next.js 探検 5日間コース：基礎の仕組みを学ぼう

こんにちは！このコースでは、5日間でNext.jsの基本的な仕組みを探検していきます。
1日10分程度の短い時間で、楽しく学んでいきましょう。

---

## 目次

*   [1日目：ページの裏側はどうなってる？](#1日目ページの裏側はどうなってる)
*   [2日目：CSSでもっとオシャレにしよう](#2日目cssでもっとオシャレにしよう)
*   [3日目：画像を表示してみよう](#3日目画像を表示してみよう)
*   [4日目：特別なページを作ろう（動的ルート）](#4日目特別なページを作ろう動的ルート)
*   [5日目：総復習！プロフィールカードを作ろう](#5日目総復習プロフィールカードを作ろう)

---

## 1日目：ページの裏側はどうなってる？

**今日のゴール：** `app`フォルダの構造が、そのままサイトのURLになることを体感する！

前回、コンポーネントを作りましたが、そもそも各ページはどこで定義されているのでしょうか？
答えは `src/app` フォルダにあります。Next.jsでは、このフォルダの中の構成が、そのままサイトのURL（ルート）になるという、非常に直感的な仕組みになっています。これを「ファイルベースルーティング」と呼びます。

*   `src/app/page.tsx` → `http://.../` (トップページ)
*   `src/app/news/page.tsx` → `http://.../news`
*   `src/app/profile/page.tsx` → `http://.../profile`

ね、分かりやすいでしょう？

**やってみよう：自己紹介ページを作ってみる**

では、`http://.../about` というURLでアクセスできる、簡単な自己紹介ページを作ってみましょう。

**ステップ1：フォルダとファイルを作成する**

`src/app` の中に `about` という名前のフォルダを作り、さらにその中に `page.tsx` というファイルを作成します。

```bash
mkdir src/app/about
touch src/app/about/page.tsx
```

**ステップ2：ページの内容を記述する**

作成した `src/app/about/page.tsx` に、以下のコードを記述します。
中身は、見出しと簡単な文章だけのシンプルなコンポーネントです。

```tsx
// src/app/about/page.tsx

export default function AboutPage() {
  return (
    <div>
      <h1>私について</h1>
      <p>こんにちは！私は今、Next.jsを勉強中です。</p>
    </div>
  );
}
```

**ステップ3：ブラウザで確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/about` にアクセスしてみてください。
「私について」という見出しのページが表示されれば、今日の探検は成功です！

**おまけ：ヘッダーにリンクを追加しよう**

せっかくなので、このページへのリンクを共通ヘッダーに追加しておきましょう。
`src/components/layout/Header.tsx` を開いて、`<ul>` タグの中に一行追加します。

```tsx
// ...
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><Link href="/">ホーム</Link></li>
          <li><Link href="/news">お知らせ</Link></li>
          <li><Link href="/products">商品紹介</Link></li>
          <li><Link href="/profile">プロフィール</Link></li>
          {/* ★ ここに追加 */}
          <li><Link href="/about">私について</Link></li>
        </ul>
// ...
```
保存すれば、自動でヘッダーに「私について」のリンクが追加されているはずです。

> **今日のまとめ**
> Next.jsでは、`app`フォルダの中に`フォルダ名/page.tsx`を作るだけで、自動的に新しいページが作られる！

---
*   **実施日:2025/8/13**
*   **学んだこと:**
- `components` で作った部品を `layout.tsx` で使うと、共通の土台（レイアウト）になる
- Next.js（およびReact）でWebページのコンポーネントを定義するための記述
 - 以下のコードは「`ProductsPage` という名前のページコンポーネントを定義し、他のファイルで使
  えるように公開（エクスポート）します。そして、このコンポーネントが表示する内容を返します」 という意味
```tsx
export default function ProductsPage() {
  return (
```
---

## 2日目：CSSでもっとオシャレにしよう

**今日のゴール：** CSS Modulesを使って、コンポーネントにだけ適用されるスタイルを書いてみる！

前回までのガイドでは、`<div style={{ color: 'blue' }}>` のように、要素に直接スタイルを書き込む「インラインスタイル」を使ってきました。手軽ですが、スタイルが複雑になるとコードが読みにくくなる欠点があります。

そこで今日は、より本格的な「CSS Modules」という方法を使ってみましょう。
これは、**CSSファイルに書いたスタイルが、特定のコンポーネントだけに適用される**ようにする仕組みです。他の部品に影響を与えないので、安心してスタイリングができます。

**やってみよう：ヘッダーコンポーネントを装飾する**

`Header.tsx` に、CSS Modulesを使って背景色と影を付けてみましょう。

**ステップ1：CSSファイルを作成する**

`Header.tsx` と同じ場所 (`src/components/layout`) に、`Header.module.css` という名前のCSSファイルを作成します。
**ファイル名の末尾が `.module.css` となっているのが重要です。**

```bash
touch src/components/layout/Header.module.css
```

**ステップ2：CSSを記述する**

作成した `Header.module.css` に、以下の内容を記述します。
`header` という名前のクラスを定義し、背景色などを指定しています。

```css
/* src/components/layout/Header.module.css */

.header {
  padding: 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

**ステップ3：コンポーネントからCSSを読み込んで適用する**

`Header.tsx` を修正して、このCSSを適用します。

```tsx
// src/components/layout/Header.tsx

import Link from 'next/link';
// ★ 1. CSSファイルをインポートする
import styles from './Header.module.css';

export default function Header() {
  return (
    // ★ 2. インラインスタイルを削除し、className にCSSモジュールを適用する
    <header className={styles.header}>
      {/* nav以下の部分は変更なし */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
            My Next.js Site
          </Link>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><Link href="/">ホーム</Link></li>
          <li><Link href="/news">お知らせ</Link></li>
          <li><Link href="/products">商品紹介</Link></li>
          <li><Link href="/profile">プロフィール</Link></li>
          <li><Link href="/about">私について</Link></li>
        </ul>
      </nav>
    </header>
  );
}
```
**変更点の解説:**
1.  `import styles from './Header.module.css';`
    *   作成したCSSファイルを `styles` という名前でインポートします。
2.  `<header className={styles.header}>`
    *   `style={{...}}` を削除し、代わりに `className` を使います。
    *   `{styles.header}` と書くことで、`Header.module.css` の中の `.header` クラスが、この `<header>` 要素にだけ適用されます。

ブラウザで確認すると、ヘッダーに薄いグレーの背景色と、うっすら影が付いているはずです。

> **今日のまとめ**
> `[名前].module.css` を作り、コンポーネントで `import` して `className` に指定すると、部品ごとに独立したスタイルを当てられる！

---
*   **実施日:**
*   **一言所感:**
---

## 3日目：画像を表示してみよう

**今日のゴール：** `public`フォルダの役割を理解し、Next.jsの`<Image>`コンポーネントで画像を表示する！

ウェブサイトに画像は欠かせません。Next.jsでは、画像などの静的なファイルを置くための専用の場所として `public` フォルダが用意されています。

`public` フォルダに置いたファイルは、`http://.../ファイル名` のように、サイトのルートからのパスで直接アクセスできます。

**やってみよう：サイトのロゴ画像を表示する**

ヘッダーの「My Next.js Site」という文字を、ロゴ画像に置き換えてみましょう。

**ステップ1：画像を準備して `public` フォルダに置く**

まず、ロゴとして使う画像を準備します。今回は、練習用に `public` フォルダに既にある `next.svg` を使いましょう。
もし自分で用意した画像を使いたい場合は、その画像ファイルを `public` フォルダの中にドラッグ＆ドロップしてください。

**ステップ2：`<Image>`コンポーネントを使って画像を表示する**

Next.jsには、通常の`<img>`タグより高機能な`<Image>`という専用のコンポーネントがあります。これを使うと、画像の読み込みを最適化してくれたり、表示崩れを防いでくれたりします。

`Header.tsx` を修正して、文字の代わりに`<Image>`を使いましょう。

```tsx
// src/components/layout/Header.tsx

import Link from 'next/link';
import styles from './Header.module.css';
// ★ 1. Imageコンポーネントをインポートする
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/">
            {/* ★ 2. 文字の代わりに Image コンポーネントを置く */}
            <Image
              src="/next.svg" // publicフォルダからのパス
              alt="Next.js Logo" // 画像の説明
              width={100} // 表示する幅
              height={24} // 表示する高さ
            />
          </Link>
        </div>
        {/* ul以下の部分は変更なし */}
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          {/* ... */}
        </ul>
      </nav>
    </header>
  );
}
```
**変更点の解説:**
1.  `import Image from 'next/image';`
    *   `Image` コンポーネントを使えるようにインポートします。
2.  `<Image ... />`
    *   `src`には、`public`フォルダからのパスを指定します (`/next.svg`)。
    *   `alt`は、画像が表示されなかった時に表示される代替テキストです。
    *   `width`と`height`の指定は必須です。これにより、画像の読み込み中にレイアウトがガタつくのを防ぎます。

ブラウザで確認すると、ヘッダーの左側がNext.jsのロゴに変わっているはずです。

> **今日のまとめ**
> 画像は`public`フォルダに置き、`<Image>`コンポーネントを使って表示すると、Next.jsが最適化してくれて便利！

---
*   **実施日:**
*   **一言所感:**
---

## 4日目：特別なページを作ろう（動的ルート）

**今日のゴール：** `[id]`を使ったフォルダ名で、URLによって内容が変わるページの仕組みを理解する！

ECサイトで「商品ID: 1」や「商品ID: 2」のページを見たり、ブログで「記事ID: abc」のページを見たりしますよね。このように、URLの一部が変化するページを「動的ルート」と呼びます。

Next.jsでは、これを非常に簡単に作ることができます。

**やってみよう：商品詳細ページ（の原型）を作る**

`http://.../products/1` や `http://.../products/2` のようなURLでアクセスできるページを作ってみましょう。

**ステップ1：特別な名前のフォルダを作成する**

`src/app` の中に `products` というフォルダを作り、さらにその中に `[id]` という名前のフォルダを作成します。
この `[]` で囲んだ名前が、動的な部分になります。

最後に、`[id]` フォルダの中に `page.tsx` を作成します。

```bash
mkdir -p src/app/products/[id]
touch src/app/products/[id]/page.tsx
```

**ステップ2：ページコンポーネントを記述する**

作成した `src/app/products/[id]/page.tsx` に、以下のコードを記述します。

```tsx
// src/app/products/[id]/page.tsx

// { params } という引数で、動的な情報を受け取れる
export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>商品詳細ページ</h1>
      <p>この商品のIDは: {params.id} です。</p>
    </div>
  );
}
```
**コードの解説:**
*   `function ProductDetailPage({ params })`
    *   ページのコンポーネントは、引数として `{ params }` を受け取ることができます。
*   `params: { id: string }`
    *   `params` の中には、動的ルートのフォルダ名（今回は `id`）と同じ名前のプロパティが入っています。
*   `{params.id}`
    *   これで、URLに含まれるIDの値をページに表示できます。

**ステップ3：ブラウザで確認**

`pnpm dev` でサーバーを起動し、
*   `http://localhost:3000/products/1`
*   `http://localhost:3000/products/apple`
*   `http://localhost:3000/products/hello-world`

などにアクセスしてみてください。URLの `products/` の後の部分が、ページに表示されていれば成功です！

> **今日のまとめ**
> `[名前]`というフォルダを作ると、URLの一部が変化する動的なページを作れる。`params.名前`でその値を取得できる！

---
*   **実施日:**
*   **一言所感:**
---

## 5日目：総復習！プロフィールカードを作ろう

**今日のゴール：** 4日間で学んだ知識を総動員して、一つの部品を作り上げる！

いよいよ最終日です。これまでに学んだこと（コンポーネント、CSS Modules、Image、ルーティング）を全部使って、簡単な「プロフィールカード」を作ってみましょう。

**完成イメージ**
*   `src/app/profile/page.tsx` に、作ったプロフィールカードを配置する。
*   カードには、アバター画像と名前、自己紹介文を表示する。

**ステップ1：コンポーネントとCSSファイルを作成**

まずは部品の置き場所です。`src/components/ui` に `ProfileCard.tsx` と `ProfileCard.module.css` を作成しましょう。（`ui` は、ボタンやカードなど、再利用性の高い小さな部品を置くのによく使われるフォルダ名です）

```bash
mkdir -p src/components/ui
touch src/components/ui/ProfileCard.tsx
touch src/components/ui/ProfileCard.module.css
```

**ステップ2：アバター画像を準備**

`public` フォルダに、アバターとして使いたい画像を `avatar.png` のような名前で保存します。（練習なので、好きな画像でOKです。なければ3日目に使った `next.svg` でも代用できます）

**ステップ3：`ProfileCard.module.css` を記述**

カードのスタイルを定義します。

```css
/* src/components/ui/ProfileCard.module.css */

.card {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  text-align: center;
  background-color: white;
}

.avatar {
  border-radius: 50%; /* 角を丸くして円にする */
}
```

**ステップ4：`ProfileCard.tsx` を記述**

これが今日のメインです。ImageとCSS Modulesを使います。

```tsx
// src/components/ui/ProfileCard.tsx

import Image from 'next/image';
import styles from './ProfileCard.module.css';

export default function ProfileCard() {
  return (
    <div className={styles.card}>
      <Image
        src="/avatar.png" // あなたが用意した画像名に
        alt="アバター画像"
        width={100}
        height={100}
        className={styles.avatar}
      />
      <h2>あなたの名前</h2>
      <p>ここに自己紹介文を書きます。Next.jsの学習、お疲れ様でした！</p>
    </div>
  );
}
```

**ステップ5：プロフィールページに配置する**

最後に、このカードを `src/app/profile/page.tsx` に表示させます。

```tsx
// src/app/profile/page.tsx

// ★ 1. 作ったカードをインポート
import ProfileCard from '@/components/ui/ProfileCard';

export default function ProfilePage() {
  return (
    <div>
      <h1>プロフィール</h1>
      {/* ★ 2. カードを配置 */}
      <ProfileCard />
    </div>
  );
}
```

**ブラウザで確認**

`http://localhost:3000/profile` にアクセスしてください。
中央に、アバター画像と名前、メッセージが入ったカードが表示されていれば、5日間の探検は無事完了です！

> **今日のまとめ**
> これまで学んだ知識を組み合わせることで、意味のあるUI部品を作ることができた！

---
*   **実施日:**
*   **一言所感:**
---

**コース完了、おめでとうございます！**
この5日間で、Next.jsの基本的なページの作り方、スタイリング、画像の扱い方、動的ルートの概念を学びました。あなたはもう、Next.jsとかなり仲良くなれたはずです！
これからも、色々なものを作りながら、さらに探検を続けていきましょう！
