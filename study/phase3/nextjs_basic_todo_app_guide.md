# Next.js基礎編：10日間で動くTODOアプリを作ろう

こんにちは！このコースでは、10日間でNext.jsを使った動的な「TODOアプリ」の作成に挑戦します。
「超基礎編」で学んだことを活かしながら、ユーザーの操作に反応するウェブサイトの仕組みを、1日10分のペースで楽しく学んでいきましょう。
---
IPアドレス自動割当プロトコル

例：ここ
注：いいね
　　こう
=D2 & CHAR(10) &"例：" & E2 & CHAR(10) &"注：" & SUBSTITUTE(F2, "、", CHAR(10) & "　　")

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
**実施日：2025/8/22**
**学んだこと：**
- src/app/ の下のフォルダ構造が、ローカルサーバーのポート番号（例:
  http://localhost:3000）の後に続くURLのパスになる
- ローカルサーバーエラー解決手順の見直し[ローカルサーバー手順解決方法](nextjs_dev_troubleshooting_guide.md)

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

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://loc,alhost:3000/todo` にアクセスしてください。
「TODOアプリ」という見出しの下に、「タスク追加フォーム」「タスク一覧」と表示されていれば、今日の探検は成功です！

> **今日のまとめ**
> アプリケーションを作るときは、まず大きなページを用意し、そこに小さな部品（コンポーネント）を組み合わせていく！

---

<br>

## 2日目：CSSで見た目を整える
**実施日：2025/9/19**
**学んだこと：**

**今日のゴール：** CSS Modulesを使って、TODOアプリの見た目を整える！

昨日作成したコンポーネントは、まだ文字が並んでいるだけです。今日はCSS Modulesを使って、TODOアプリらしい見た目に整えていきましょう。

**ステップ1：TODOアプリのメインCSSファイルを作成する**

`src/app/todo/page.tsx` と同じディレクトリに、`page.module.css` を作成します。
ここに、ページ全体のレイアウトや、コンポーネント共通のスタイルを記述します。

```bash
touch src/app/todo/page.module.css
```

`src/app/todo/page.module.css` に以下の内容を記述します。

```css
/* src/app/todo/page.module.css */
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}
```

`src/app/todo/page.tsx` を修正して、このCSSを適用します。

```tsx
// src/app/todo/page.tsx

) {
  return (
    <div className={styles.container}> {/* ★ 変更 */}
      <h1 className={styles.title}>TODOアプリ</h1> {/* ★ 変更 */}
      <AddTodoForm />
      <TodoList />
    </div>
  );
}
```

**ステップ2：`AddTodoForm` のスタイルを整える**

`src/components/todo/AddTodoForm.tsx` と同じディレクトリに、`AddTodoForm.module.css` を作成します。

```bash
touch src/components/todo/AddTodoForm.module.css
```

`src/components/todo/AddTodoForm.module.css` に以下の内容を記述します。

```css
/* src/components/todo/AddTodoForm.module.css */
.form {
  display: flex;
  margin-bottom: 20px;
}

.input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
```

`src/components/todo/AddTodoForm.tsx` を修正して、このCSSを適用します。

```tsx
// src/components/todo/AddTodoForm.tsx

import styles from "./AddTodoForm.module.css"; // ★ 追加

export default function AddTodoForm() {
  return (
    <form className={styles.form}> {/* ★ 変更 */}
      <input type="text" placeholder="新しいタスクを追加" className={styles.input} /> {/* ★ 変更 */}
      <button timport AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css"; // ★ 追加

export default function TodoPage(ype="submit" className={styles.button}>追加</button> {/* ★ 変更 */}
    </form>
  );
}
```

**ステップ3：`TodoList` と `TodoItem` のスタイルを整える**

`src/components/todo/TodoList.tsx` と同じディレクトリに、`TodoList.module.css` を作成します。

```bash
touch src/components/todo/TodoList.module.css
```

`src/components/todo/TodoList.module.css` に以下の内容を記述します。

```css
/* src/components/todo/TodoList.module.css */
.list {
  list-style: none;
  padding: 0;
}
```

`src/components/todo/TodoItem.tsx` と同じディレクトリに、`TodoItem.module.css` を作成します。

```bash
touch src/components/todo/TodoItem.module.css
```

`src/components/todo/TodoItem.module.css` に以下の内容を記述します。

```css
/* src/components/todo/TodoItem.module.css */
.item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.item:last-child {
  border-bottom: none;
}

.text {
  flex-grow: 1;
  margin-left: 10px;
}

.deleteButton {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #c82333;
}
```

`src/components/todo/TodoList.tsx` を修正して、このCSSを適用します。

```tsx
// src/components/todo/TodoList.tsx

import styles from "./TodoList.module.css"; // ★ 追加
import TodoItem from "./TodoItem"; // ★ 追加

export default function TodoList() {
  return (
    <ul className={styles.list}> {/* ★ 変更 */}
      {/* 仮のタスクをいくつか表示 */}
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </ul>
  );
}
```

`src/components/todo/TodoItem.tsx` を修正して、このCSSを適用します。

```tsx
// src/components/todo/TodoItem.tsx

import styles from "./TodoItem.module.css"; // ★ 追加

export default function TodoItem() {
  return (
    <li className={styles.item}> {/* ★ 変更 */}
      <input type="checkbox" />
      <span className={styles.text}>タスク１個</span> {/* ★ 変更 */}
      <button className={styles.deleteButton}>削除</button> {/* ★ 変更 */}
    </li>
  );
}
```

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
TODOアプリらしい見た目になっていれば成功です！

> **今日のまとめ**
> CSS Modulesを使って、コンポーネントごとに独立したスタイルを適用し、見た目を整えることができた！

<br>

## 3日目：「状態」という考え方

**今日のゴール：** `useState` を使って、TODOリストのデータを管理する！

Webアプリケーションは、ユーザーの操作によって表示内容が変化します。この「変化するデータ」を「状態（State）」と呼び、Reactでは `useState` という特別な機能（Hook）を使って管理します。

**ステップ1：`useState` をインポートする**

`src/app/todo/page.tsx` を開いて、Reactから `useState` をインポートします。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState } from "react"; // ★ 追加

export default function TodoPage() {
  // ...
}
```

**ステップ2：TODOリストの「状態」を定義する**

`TodoPage` コンポーネントの中に、TODOリストのデータを保持するための状態を定義します。
最初は仮のデータを入れておきましょう。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState } from "react";

export default function TodoPage() {
  // ★ ここから追加
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "Next.jsの勉強", completed: true },
    { id: 3, text: "運動する", completed: false },
  ]);
  // ★ ここまで追加

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODOアプリ</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}
```
*   `todos`: 現在のTODOリストのデータが入っている変数です。
*   `setTodos`: `todos` のデータを更新するための関数です。この関数を使わないと、画面は更新されません。
*   `useState([...])`: `todos` の初期値を設定しています。

**ステップ3：`TodoList` にデータを渡す**

定義した `todos` の状態を、`TodoList` コンポーネントに渡します。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "Next.jsの勉強", completed: true },
    { id: 3, text: "運動する", completed: false },
  ]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODOアプリ</h1>
      <AddTodoForm />
      <TodoList todos={todos} /> {/* ★ 変更 */}
    </div>
  );
}
```

**ステップ4：`TodoList` でデータを受け取り、表示する**

`src/components/todo/TodoList.tsx` を修正して、`todos` データを受け取り、それぞれのタスクを `TodoItem` として表示するようにします。

```tsx
// src/components/todo/TodoList.tsx

import styles from "./TodoList.module.css";
import TodoItem from "./TodoItem";

// ★ propsの型定義を追加
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

// ★ propsを受け取るように変更
export default function TodoList({ todos }: TodoListProps) {
  return (
    <ul className={styles.list}> {/* ★ 変更 */}
      {/* ★ todos配列をmapで回してTodoItemを表示 */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```
*   `interface Todo` と `interface TodoListProps`: TypeScriptを使っているので、受け取るデータの形（型）を明確に定義しています。
*   `{ todos }: TodoListProps`: `props` として `todos` を受け取っています。
*   `todos.map((todo) => ...)`: `todos` 配列の各要素（`todo`）に対して、`TodoItem` コンポーネントを生成しています。
*   `key={todo.id}`: `map` を使うときは、Reactが要素を効率的に識別できるように `key` プロパティを必ず指定します。通常はデータのIDを使います。
*   `todo={todo}`: 個々の `todo` オブジェクトを `TodoItem` に `todo` という名前の `props` として渡しています。

**ステップ5：`TodoItem` でデータを受け取り、表示する**

`src/components/todo/TodoItem.tsx` を修正して、`todo` データを受け取り、その内容を表示するようにします。

```tsx
// src/components/todo/TodoItem.tsx

import styles from "./TodoItem.module.css";

// ★ propsの型定義を追加
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

// ★ propsを受け取るように変更
export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className={styles.item}> {/* ★ 変更 */}
      <input type="checkbox" checked={todo.completed} readOnly /> {/* ★ 変更 */}
      <span className={styles.text}>{todo.text}</span> {/* ★ 変更 */}
      <button className={styles.deleteButton}>削除</button>
    </li>
  );
}
```
*   `checked={todo.completed}`: `todo.completed` の値に応じてチェックボックスの状態が変わります。
*   `readOnly`: 現時点ではチェックボックスを操作できないようにしています。
*   `{todo.text}`: `todo.text` の値が表示されます。

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
定義した仮のTODOリスト（「牛乳を買う」「Next.jsの勉強」「運動する」）が表示されていれば成功です！

> **今日のまとめ**
> `useState` でデータを「状態」として管理し、`props` を使って親コンポーネントから子コンポーネントへデータを渡すことができた！

<br>

## 4日目：コンポーネント間でデータを渡す

**今日のゴール：** 親から子へ「Props」を使って、タスク情報を渡す方法を学ぶ！

3日目で `props` を使って `TodoList` から `TodoItem` へデータを渡しました。今日は、この `props` の概念をさらに深掘りし、コンポーネント間のデータの流れを理解しましょう。

**ステップ1：`TodoItem` に `onDelete` 関数を渡す準備**

タスクを削除するボタンを機能させるために、`TodoItem` に「削除されたときに実行する関数」を渡せるようにします。

`src/components/todo/TodoItem.tsx` の `TodoItemProps` に `onDelete` を追加します。

```tsx
// src/components/todo/TodoItem.tsx

import styles from "./TodoItem.module.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void; // ★ 追加: 削除時に呼ばれる関数
}

export default function TodoItem({ todo, onDelete }: TodoItemProps) { // ★ 変更
  return (
    <li className={styles.item}> {/* ★ 変更 */}
      <input type="checkbox" checked={todo.completed} readOnly />
      <span className={styles.text}>{todo.text}</span>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)} // ★ 変更: ボタンクリックでonDeleteを呼び出す
      >
        削除
      </button>
    </li>
  );
}
```
*   `onDelete: (id: number) => void;`: `onDelete` は、数値の `id` を引数にとり、何も返さない関数であることを示しています。
*   `onClick={() => onDelete(todo.id)}`: ボタンがクリックされたら、`onDelete` 関数を呼び出し、このタスクの `id` を渡します。

**ステップ2：`TodoPage` で `handleDelete` 関数を作成する**

`src/app/todo/page.tsx` に、タスクを削除するための関数 `handleDelete` を作成します。
この関数は、指定されたIDのタスクを `todos` リストから取り除きます。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "Next.jsの勉強", completed: true },
    { id: 3, text: "運動する", completed: false },
  ]);

  // ★ ここから追加
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // ★ ここまで追加

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODOアプリ</h1>
      <AddTodoForm />
      <TodoList todos={todos} onDelete={handleDeleteTodo} /> {/* ★ 変更 */}
    </div>
  );
}
```
*   `todos.filter((todo) => todo.id !== id)`: `filter` メソッドは、条件に合う要素だけを残した新しい配列を作成します。ここでは、削除したいIDと異なるIDのタスクだけを残しています。
*   `setTodos(...)`: 新しい配列で `todos` の状態を更新しています。

**ステップ3：`TodoList` を経由して `onDelete` を渡す**

`src/components/todo/TodoList.tsx` を修正して、`TodoPage` から受け取った `onDelete` 関数を、さらに `TodoItem` に渡します。

```tsx
// src/components/todo/TodoList.tsx

import styles from "./TodoList.module.css";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void; // ★ 追加
}

export default function TodoList({ todos, onDelete }: TodoListProps) { // ★ 変更
  return (
    <ul className={styles.list}> {/* ★ 変更 */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} /> // ★ 変更
      ))}
    </ul>
  );
}
```

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
各タスクの「削除」ボタンをクリックすると、そのタスクがリストから消えれば成功です！

> **今日のまとめ**
> `props` を使って、親コンポーネントで定義した関数を子コンポーネントに渡し、子コンポーネントのイベント（ボタンクリックなど）でその関数を呼び出すことで、親の状態を更新できる！

<br>

## 5日目：フォームで入力を受け取る

**今日のゴール：** ユーザーが入力した新しいタスクのテキストをプログラムで受け取る！

TODOアプリの重要な機能の一つは、新しいタスクを追加することです。今日は、入力フォームからユーザーが入力したテキストを正確に取得する方法を学びます。

**ステップ1：`AddTodoForm` で入力値を管理する**

`src/components/todo/AddTodoForm.tsx` を修正して、入力フィールドの値を `useState` で管理するようにします。

```tsx
// src/components/todo/AddTodoForm.tsx

import { useState } from "react"; // ★ 追加
import styles from "./AddTodoForm.module.css";

export default function AddTodoForm() {
  const [inputText, setInputText] = useState(""); // ★ 追加: 入力値を管理するstate

  const handleSubmit = (e: React.FormEvent) => { // ★ 追加: フォーム送信時の処理
    e.preventDefault(); // ページの再読み込みを防ぐ
    if (inputText.trim() === "") return; // 空の入力は無視

    console.log("入力されたタスク:", inputText); // ★ 確認用: コンソールに出力
    setInputText(""); // 入力フィールドをクリア
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}> {/* ★ 変更: onSubmitを追加 */}
      <input
        type="text"
        placeholder="新しいタスクを追加"
        className={styles.input}
        value={inputText} // ★ 変更: stateの値を表示
        onChange={(e) => setInputText(e.target.value)} // ★ 変更: 入力値が変更されたらstateを更新
      />
      <button type="submit" className={styles.button}>追加</button>
    </form>
  );
}
```
*   `useState("")`: `inputText` という状態変数で入力フィールドの値を管理します。初期値は空文字列です。
*   `value={inputText}`: `input` 要素の `value` プロパティに `inputText` を設定することで、入力フィールドの表示が `inputText` の値と同期されます。
*   `onChange={(e) => setInputText(e.target.value)}`: 入力フィールドの値が変更されるたびに `setInputText` を呼び出し、`inputText` の状態を更新します。
*   `handleSubmit`: フォームが送信されたときに実行される関数です。
    *   `e.preventDefault()`: フォームを送信するとページが再読み込みされるデフォルトの動作を防ぎます。
    *   `console.log(...)`: 現時点では、入力されたテキストをコンソールに表示して確認します。

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
入力フィールドに何か文字を入力し、「追加」ボタンをクリックすると、ブラウザの開発者ツール（F12キーなどで開けます）の「Console」タブに、入力したテキストが表示されれば成功です！

> **今日のまとめ**
> `useState` と `onChange` を組み合わせて入力フィールドの値を管理し、`onSubmit` でフォームの送信イベントを処理することで、ユーザーの入力を受け取ることができた！

<br>

## 6日目：タスクを追加する機能

**今日のゴール：** フォームから入力された新しいタスクをTODOリストに追加する！

5日目で入力されたテキストを受け取れるようになりました。今日は、そのテキストを使って新しいタスクを作成し、既存のTODOリストに追加する機能を実装します。

**ステップ1：`TodoPage` に `handleAddTodo` 関数を作成する**

`src/app/todo/page.tsx` に、新しいタスクを追加するための関数 `handleAddTodo` を作成します。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "Next.jsの勉強", completed: true },
    { id: 3, text: "運動する", completed: false },
  ]);

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ★ ここから追加
  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1, // ユニークなIDを生成
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // 既存のリストに新しいタスクを追加
  };
  // ★ ここまで追加

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODOアプリ</h1>
      <AddTodoForm onAddTodo={handleAddTodo} /> {/* ★ 変更 */}
      <TodoList todos={todos} onDelete={handleDeleteTodo} />
    </div>
  );
}
```
*   `handleAddTodo(text: string)`: 新しいタスクのテキストを受け取ります。
*   `id: ...`: 新しいタスクにユニークなIDを割り当てています。既存のIDの最大値に1を足すことで、重複しないIDを生成しています。
*   `setTodos([...todos, newTodo])`: スプレッド構文 (`...`) を使って既存の `todos` 配列の要素をすべて展開し、その後に `newTodo` を追加した新しい配列を作成し、状態を更新しています。**既存の配列を直接変更するのではなく、常に新しい配列を作成して `setTodos` に渡すのがReactの流儀です。**

**ステップ2：`AddTodoForm` から `handleAddTodo` を呼び出す**

`src/components/todo/AddTodoForm.tsx` を修正して、`TodoPage` から受け取った `onAddTodo` 関数を、フォーム送信時に呼び出すようにします。

```tsx
// src/components/todo/AddTodoForm.tsx

import { useState } from "react";
import styles from "./AddTodoForm.module.css";

// ★ propsの型定義を追加
interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
}

// ★ propsを受け取るように変更
export default function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    onAddTodo(inputText); // ★ 変更: 親から渡された関数を呼び出す
    setInputText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="新しいタスクを追加"
        className={styles.input}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" className={styles.button}>追加</button>
    </form>
  );
}
```

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
入力フィールドに新しいタスクを入力し、「追加」ボタンをクリックすると、リストに新しいタスクが追加されれば成功です！

> **今日のまとめ**
> 親コンポーネントで状態更新関数を定義し、それを子コンポーネントに `props` として渡すことで、子コンポーネントからの操作で親の状態を更新し、新しい要素を追加することができた！

<br>

## 7日目：タスクを削除する機能

**今日のゴール：** 削除ボタンをクリックすると、そのタスクがリストから消えるようにする！

4日目で削除ボタンの準備はできています。今日は、実際にタスクをリストから削除する機能を完成させましょう。

**ステップ1：`TodoPage` の `handleDeleteTodo` を確認する**

4日目で既に `handleDeleteTodo` 関数を作成し、`TodoList` を経由して `TodoItem` に渡しています。
この関数は、指定されたIDのタスクを `todos` リストから取り除く処理を行っています。

```tsx
// src/app/todo/page.tsx (抜粋)

// ...
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
// ...
```
このコードは既に正しく動作するはずです。

**ステップ2：`TodoItem` の `onDelete` 呼び出しを確認する**

`src/components/todo/TodoItem.tsx` で、削除ボタンがクリックされたときに `onDelete` 関数が呼び出されていることを確認します。

```tsx
// src/components/todo/TodoItem.tsx (抜粋)

// ...
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)} // ★ ここでonDeleteが呼び出されている
      >
        削除
      </button>
// ...
```
これも4日目で既に実装済みです。

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
各タスクの「削除」ボタンをクリックすると、そのタスクがリストから消えれば成功です！
（4日目で既に確認済みですが、改めて動作を確認しましょう。）

> **今日のまとめ**
> 親から子へ関数を `props` で渡し、子でその関数を呼び出すことで、親の状態を操作し、リストから要素を削除する仕組みを再確認した！

<br>

## 8日目：タスクを更新する機能

**今日のゴール：** チェックボックスで、タスクの「完了/未完了」を切り替える！

TODOアプリには、タスクが完了したかどうかを示すチェックボックスが不可欠です。今日は、このチェックボックスを操作することで、タスクの状態を更新する機能を実装します。

**ステップ1：`TodoPage` に `handleToggleComplete` 関数を作成する**

`src/app/todo/page.tsx` に、タスクの完了状態を切り替えるための関数 `handleToggleComplete` を作成します。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "Next.jsの勉強", completed: true },
    { id: 3, text: "運動する", completed: false },
  ]);

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // ★ ここから追加
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  // ★ ここまで追加

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODOアプリ</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onToggleComplete={handleToggleComplete} // ★ 変更
      />
    </div>
  );
}
```
*   `todos.map(...)`: `map` メソッドは、配列の各要素に対して処理を行い、新しい配列を返します。
*   `todo.id === id ? { ...todo, completed: !todo.completed } : todo`: 
    *   もし現在の `todo` の `id` が、完了状態を切り替えたい `id` と一致したら、
    *   スプレッド構文 (`...todo`) で既存の `todo` のプロパティをすべてコピーし、`completed` プロパティだけを反転 (`!todo.completed`) させた新しいオブジェクトを作成します。
    *   一致しない場合は、元の `todo` オブジェクトをそのまま返します。
*   これにより、特定のタスクの `completed` 状態だけが切り替わった新しい `todos` 配列が生成されます。

**ステップ2：`TodoList` を経由して `onToggleComplete` を渡す**

`src/components/todo/TodoList.tsx` を修正して、`TodoPage` から受け取った `onToggleComplete` 関数を、さらに `TodoItem` に渡します。

```tsx
// src/components/todo/TodoList.tsx

import styles from "./TodoList.module.css";
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void; // ★ 追加
}

export default function TodoList({ todos, onDelete, onToggleComplete }: TodoListProps) { // ★ 変更
  return (
    <ul className={styles.list}> {/* ★ 変更 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete} // ★ 変更
        />
      ))}
    </ul>
  );
}
```

**ステップ3：`TodoItem` でチェックボックスの操作を実装する**

`src/components/todo/TodoItem.tsx` を修正して、チェックボックスが操作されたときに `onToggleComplete` 関数を呼び出すようにします。

```tsx
// src/components/todo/TodoItem.tsx

import styles from "./TodoItem.module.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void; // ★ 追加
}

export default function TodoItem({ todo, onDelete, onToggleComplete }: TodoItemProps) { // ★ 変更
  return (
    <li className={styles.item}> {/* ★ 変更 */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)} // ★ 変更: チェックボックス変更時に呼び出す
      />
      <span className={`${styles.text} ${todo.completed ? styles.completed : ""}`}> {/* ★ 変更: 完了時にスタイルを適用 */}
        {todo.text}
      </span>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
      >
        削除
      </button>
    </li>
  );
}
```
*   `onChange={() => onToggleComplete(todo.id)}`: チェックボックスの状態が変更されたら、`onToggleComplete` 関数を呼び出し、このタスクの `id` を渡します。
*   `className={`${styles.text} ${todo.completed ? styles.completed : ""}`}`:
    *   タスクが完了 (`todo.completed` が `true`) している場合、`styles.completed` というCSSクラスを追加します。
    *   このクラスは、例えばテキストに打ち消し線を入れるなどのスタイルを適用するために使います。

**ステップ4：完了時のスタイルを追加する**

`src/components/todo/TodoItem.module.css` に、完了したタスクのスタイルを追加します。

```css
/* src/components/todo/TodoItem.module.css */
.item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.item:last-child {
  border-bottom: none;
}

.text {
  flex-grow: 1;
  margin-left: 10px;
}

.completed { /* ★ 追加 */
  text-decoration: line-through;
  color: #888;
}

.deleteButton {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.deleteButton:hover {
  background-color: #c82333;
}
```

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
チェックボックスをクリックすると、タスクの完了状態が切り替わり、テキストに打ち消し線が引かれれば成功です！

> **今日のまとめ**
> `map` と条件付きレンダリングを組み合わせて、特定の要素の状態を更新し、それに応じて見た目を変更することができた！

<br>

## 9日目：データベースからデータを取得

**今日のゴール：** SupabaseからTODOリストのデータを読み込み、表示する！

これまではTODOリストのデータをアプリのメモリ上に保持していましたが、これではアプリを閉じるとデータが消えてしまいます。今日は、Supabaseというデータベースサービスを使って、データを永続的に保存し、アプリ起動時に読み込む方法を学びます。

**ステップ1：Supabaseの準備（手動作業）**

このステップは、あなたの手でSupabaseのウェブサイトで行う必要があります。

1.  **Supabaseプロジェクトの作成:**
    *   Supabaseのウェブサイト (https://supabase.com/) にアクセスし、アカウントを作成またはログインします。
    *   新しいプロジェクトを作成します。
    *   プロジェクトが作成されたら、「Database」セクションに移動します。
2.  **`todos` テーブルの作成:**
    *   「Table Editor」または「SQL Editor」を使って、`todos` という名前の新しいテーブルを作成します。
    *   以下のカラムを追加します。
        *   `id`: `int8` (Primary Key, Is Identity, Default: `nextval('todos_id_seq'::regclass)`)
        *   `text`: `text`
        *   `completed`: `boolean` (Default: `false`)
        *   `created_at`: `timestamp with time zone` (Default: `now()`)
    *   `Row Level Security (RLS)` は、今回は無効にしておきます（開発をシンプルにするため）。
3.  **APIキーの確認:**
    *   プロジェクトの「Settings」→「API」セクションで、`anon public` キーと `service_role` キーを確認します。
    *   `src/lib/supabase.ts` に、これらのキーが正しく設定されていることを確認してください。

**ステップ2：`TodoPage` でSupabaseからデータを取得する**

`src/app/todo/page.tsx` を修正して、コンポーネントがマウントされたときにSupabaseからTODOリストのデータを取得するようにします。

```tsx
// src/app/todo/page.tsx

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState, useEffect } from "react"; // ★ useEffectを追加
import { supabase } from "@/lib/supabase"; // ★ supabaseクライアントをインポート

interface Todo { // ★ Todoインターフェースをここに移動（他のコンポーネントでも使うため）
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]); // ★ 初期値を空の配列に変更
  const [loading, setLoading] = useState(true); // ★ 追加: ローディング状態を管理

  // ★ ここから追加
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*").order("id", { ascending: true });
      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data || []);
      }
      setLoading(false);
    };

    fetchTodos();
  }, []); // 空の依存配列は、コンポーネントがマウントされたときに一度だけ実行されることを意味します
  // ★ ここまで追加

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) { // ★ 追加: ローディング中の表示
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>TODOアプリ</h1>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODOアプリ</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}
```
*   `useEffect`: コンポーネントのライフサイクル（マウント時、更新時など）で副作用（データの取得など）を実行するためのHookです。空の依存配列 `[]` を渡すと、コンポーネントが最初にマウントされたときに一度だけ実行されます。
*   `supabase.from("todos").select("*")`: `todos` テーブルからすべてのカラムのデータを取得します。
*   `setLoading(true/false)`: データ取得中に「読み込み中...」と表示するための状態です。

**今日の確認**

1.  Supabaseで`todos`テーブルにいくつかダミーのタスクを追加してみてください。
2.  `pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
3.  Supabaseに追加したタスクがアプリに表示されれば成功です！

> **今日のまとめ**
> `useEffect` と `supabase` クライアントを使って、データベースからデータを非同期で取得し、アプリに表示することができた！

<br>

## 10日目：データベースと完全連携

**今日のゴール：** タスクの追加、削除、更新の操作をSupabaseに反映させる！

いよいよ最終日です。これまでの知識を総動員して、TODOアプリのすべての操作（追加、削除、更新）をSupabaseと連携させ、真に動的なアプリケーションを完成させましょう。

**ステップ1：タスク追加をSupabaseに反映させる**

`src/app/todo/page.tsx` の `handleAddTodo` 関数を修正して、新しいタスクをSupabaseに挿入するようにします。

```tsx
// src/app/todo/page.tsx (抜粋)

// ...
  const handleAddTodo = async (text: string) => { // ★ asyncを追加
    const { data, error } = await supabase.from("todos").insert([{ text, completed: false }]).select(); // ★ 変更
    if (error) {
      console.error("Error adding todo:", error);
    } else if (data && data.length > 0) {
      setTodos((prevTodos) => [...prevTodos, data[0]]); // ★ 変更: Supabaseから返されたデータを使用
    }
  };
// ...
```
*   `insert([{ text, completed: false }])`: 新しいタスクを `todos` テーブルに挿入します。
*   `.select()`: 挿入されたデータを返してもらうように指定します。Supabaseが自動で割り当てた `id` などが含まれます。
*   `setTodos((prevTodos) => [...prevTodos, data[0]])`: `setTodos` に関数を渡すことで、最新の `prevTodos` の状態に基づいて新しい状態を計算できます。Supabaseから返された `data[0]` を追加します。

**ステップ2：タスク削除をSupabaseに反映させる**

`src/app/todo/page.tsx` の `handleDeleteTodo` 関数を修正して、Supabaseからタスクを削除するようにします。

```tsx
// src/app/todo/page.tsx (抜粋)

// ...
  const handleDeleteTodo = async (id: number) => { // ★ asyncを追加
    const { error } = await supabase.from("todos").delete().eq("id", id); // ★ 変更
    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // ★ 変更: 成功したらUIを更新
    }
  };
// ...
```
*   `delete().eq("id", id)`: `id` が一致するレコードを `todos` テーブルから削除します。

**ステップ3：タスク更新をSupabaseに反映させる**

`src/app/todo/page.tsx` の `handleToggleComplete` 関数を修正して、Supabaseでタスクの完了状態を更新するようにします。

```tsx
// src/app/todo/page.tsx (抜粋)

// ...
  const handleToggleComplete = async (id: number) => { // ★ asyncを追加
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const { error } = await supabase
      .from("todos")
      .update({ completed: !todoToUpdate.completed }) // ★ 変更
      .eq("id", id); // ★ 変更

    if (error) {
      console.error("Error updating todo:", error);
    }
    else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todoToUpdate.completed } : todo
        )
      );
    } // ★ 変更: 成功したらUIを更新
  };
// ...
```
*   `update({ completed: !todoToUpdate.completed }).eq("id", id)`: `id` が一致するレコードの `completed` カラムを更新します。

**今日の確認**

`pnpm dev` で開発サーバーを起動し、ブラウザで `http://localhost:3000/todo` にアクセスしてください。
新しいタスクの追加、既存タスクの削除、チェックボックスでの完了状態の切り替えが、すべてSupabaseのデータベースに反映されれば成功です！
Supabaseのテーブルエディタでデータがリアルタイムに変化することを確認してみましょう。

> **今日のまとめ**
> `supabase` クライアントの `insert`, `delete`, `update` メソッドを使って、TODOアプリのすべての操作をデータベースと連携させることができた！これで、真に動的なWebアプリケーションが完成した！

---

**コース完了、おめでとうございます！**
この10日間で、Next.jsを使った動的なTODOアプリをゼロから構築し、Reactの「状態」管理、コンポーネント間のデータ連携、そしてデータベースとの連携といった、Webアプリケーション開発の重要な概念を実践的に学びました。

この経験は、あなたがNext.jsでさらに複雑なアプリケーションを開発していくための強力な土台となるでしょう。これからも、新しいアイデアを形にするために、楽しくコーディングを続けていきましょう！