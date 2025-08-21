# Next.js基礎編：10日間で動くTODOアプリを作ろう

こんにちは！このコースでは、10日間でNext.jsを使った動的な「TODOアプリ」の作成に挑戦します。
「超基礎編」で学んだことを活かしながら、ユーザーの操作に反応するウェブサイトの仕組みを、1日10分のペースで楽しく学んでいきましょう。

---

## 目次

*   [1日目：UIの骨格作り](#1日目uiの骨格作り)
*   [2日目：CSSで見た目を整える](#2日目cssで見た目を整える)
*   [3日目：「状態」という考え方](#3日目状態という考え方)
*   [4日目：コンポーネント間でデータを渡す](#4日目コンポーネント間でデータを渡す)
*   [5日目：フォームで入力を受け取る](#5日目フォームで入力を受け取る)
*   [6日目：タスクを追加する機能](#6日目タスクを追加する機能)
*   [7日目：タスクを削除する機能](#7日目タスクを削除する機能)
*   [8日目：タスクを更新する機能](#8日目タスクを更新する機能)
*   [9日目：データベースからデータを取得](#9日目データベースからデータを取得)
*   [10日目：データベースと完全連携](#10日目データベースと完全連携)

---

## 1日目：UIの骨格作り

**今日のゴール：** TODOアプリに必要なコンポーネントのファイルを作成し、ページに配置する！

どんなアプリケーションも、まずは見た目の骨格から作ります。
今日は、TODOアプリを構成する3つの主要な部品（コンポーネント）のファイルを作成し、それらを配置するための新しいページを用意します。

**ステップ1：TODOアプリ用のページを作成する**

まずは、`http://.../todo` というURLでアクセスできるページを作りましょう。
`src/app` の中に `todo` という名前のフォルダを作り、さらにその中に `page.tsx` というファイルを作成します。

```bash
mkdir -p src/app/todo
touch src/app/todo/page.tsx
```

作成した `src/app/todo/page.tsx` に、まず以下のコードを記述します。
これがTODOアプリ全体の親ページになります。

```tsx
// src/app/todo/page.tsx

export default function TodoPage() {
  return (
    <div>
      <h1>TODOアプリ</h1>
      {/* ここにタスク追加フォームとタスク一覧が入ります */}
    </div>
  );
}
```

**ステップ2：部品（コンポーネント）のファイルを作成する**

次に、TODOアプリで使う3つの部品の置き場所を作ります。
`src/components/todo` という新しいフォルダを作り、その中に以下の3つのファイルを作成してください。

*   `AddTodoForm.tsx`: 新しいタスクを追加するための入力フォーム
*   `TodoList.tsx`: タスクの一覧を表示するリスト全体
*   `TodoItem.tsx`: 個々のタスク1つ分

```bash
mkdir -p src/components/todo
touch src/components/todo/AddTodoForm.tsx
touch src/components/todo/TodoList.tsx
touch src/components/todo/TodoItem.tsx
```

**ステップ3：各コンポーネントに仮のコードを入れる**

作成した3つのファイルに、それぞれがどんな部品なのか分かるように、最低限のコードを記述しておきましょう。

```tsx
// src/components/todo/AddTodoForm.tsx
export default function AddTodoForm() {
  return <p>タスク追加フォーム</p>;
}
```

```tsx
// src/components/todo/TodoList.tsx
export default function TodoList() {
  return <p>タスク一覧</p>;
}
```

```tsx
// src/components/todo/TodoItem.tsx
export default function TodoItem() {
  return <p>タスク１個</p>;
}
```

**ステップ4：ページにコンポーネントを配置する**

最後に、ステップ1で作った親ページ (`src/app/todo/page.tsx`) に、今作った部品を配置します。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";

export default function TodoPage() {
  return (
    <div>
      <h1>TODOアプリ</h1>
      {/* タスク追加フォームを配置 */}
      <AddTodoForm />
      {/* タスク一覧を配置 */}
      <TodoList />
    </div>
  );
}
```
*   `import`文で、使いたいコンポーネントを読み込んでいるのがポイントです。
*   `TodoList` の中で `TodoItem` を使うので、ここでは `TodoItem` を直接インポートする必要はありません。

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
「TODOアプリ」という見出しの下に、「タスク追加フォーム」「タスク一覧」と表示されていれば、今日の探検は成功です！

> **今日のまとめ**
> アプリケーションを作るときは、まず大きなページを用意し、そこに小さな部品（コンポーネント）を組み合わせていく！

---
