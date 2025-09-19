// src/components/todo/AddTodoForm.tsx

import styles from "./AddTodoForm.module.css"; // ★ 追加

export default function AddTodoForm() {
  return (
      <form className={styles.form}> 
      <input type="text" placeholder="新しいタスクを追加" className={styles.input} /> {/* ★ 変更 */}
      <button timport AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css"; // ★ 追加

export default function TodoPage(ype="submit" className={styles.button}>追加</button> {/* ★ 変更 */}
    </form>
  );
}