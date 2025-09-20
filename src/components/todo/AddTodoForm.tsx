import styles from "./AddTodoForm.module.css"; // ★ 追加

export default function AddTodoForm() {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="add task" className={styles.input} />
      <button type="submit" className={styles.button}>add</button>
    </form>
  );
}