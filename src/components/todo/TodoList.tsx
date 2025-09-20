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