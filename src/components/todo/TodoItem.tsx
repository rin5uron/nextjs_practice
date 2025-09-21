import styles from "./TodoItem.module.css";

// ★ propsの型定義を追加
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void; 
}

// ★ propsを受け取るように変更
export default function TodoItem({ todo, onDelete, onToggleComplete }: TodoItemProps) {
  return (
    <li className={styles.item}> {/* ★ 変更 */}
      <input type="checkbox" checked={todo.completed} onChange={() => onToggleComplete(todo.id)} /> {/* ★ 変更 */}
      <span className={`${styles.text} ${todo.completed ? styles.completed : ""}`}> {/* ★ 変更: 完了時にスタイルを適用 */}
        {todo.text}
      </span>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
      >
        delete
      </button>
    </li>
  );
}