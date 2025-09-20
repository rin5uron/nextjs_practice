import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";

export default function TodoPage() {
  return (
    <div className={styles.container}> {/* ★ CSS Modulesを使っている */}
      <h1 className={styles.title}>TODOアプリ</h1> {/* ★CSS Modulesを使っている */}
      <AddTodoForm />
      <TodoList />
    </div>
  );
}