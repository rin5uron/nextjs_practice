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