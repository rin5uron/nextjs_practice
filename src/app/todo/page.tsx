"use client";
import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: "牛乳を買う", completed: false },
    { id: 2, text: "Next.jsの勉強", completed: true },
    { id: 3, text: "運動する", completed: false },
  ]);
  return (
    <div className={styles.container}> {/* ★ CSS Modulesを使っている */}
      <h1 className={styles.title}>TODO</h1> {/* ★CSS Modulesを使っている */}
      <AddTodoForm />
      <TodoList todos={todos} />
    </div>
  );
}