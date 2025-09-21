"use client";
import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // ★ ここを修正

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]); // ★ 型を追加
  const [loading, setLoading] = useState(true);

  const supabase = createClient(); // ★ ここでクライアントを生成

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*").order("id", { ascending: true });
      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data || []);
      }
      setLoading(false);
    };

    fetchTodos();
  }, []);

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleAddTodo = (text: string) => {
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1, // ユニークなIDを生成
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]); // 既存のリストに新しいタスクを追加
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>TODO</h1>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TODO</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onToggleComplete={handleToggleComplete} // ★ 追加
      />
    </div>
  );
}