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