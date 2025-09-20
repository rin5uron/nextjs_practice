import styles from "./TodoItem.module.css"; // ★ 追加

export default function TodoItem() {
  return (
    <li className={styles.item}> {/* ★ 変更 */}
      <input type="checkbox" />
      <span className={styles.text}>ここにタスクが追加されるよ</span> {/* ★ 変更 */}
      <button className={styles.deleteButton}>delate</button> {/* ★ 変更 */}
    </li>
  );
}