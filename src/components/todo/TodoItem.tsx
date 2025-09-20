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
      <button className={styles.deleteButton}>delate</button>
    </li>
  );
}