import styles from "./AddTodoForm.module.css"; // ★ 追加

export default function AddTodoForm() {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="新しいタスクを追加" className={styles.input} />
      <button type="submit" className={styles.button}>追加</button>
    </form>
  );
}