import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";

export default function TodoPage() {
  return (
    <div>
      <h1>TODOアプリ</h1>
      {/* タスク追加フォームを配置 */}
      <AddTodoForm />
      {/* タスク一覧を配置 */}
      <TodoList />
    </div>
  );
}