import { useState } from "react";
import styles from "./AddTodoForm.module.css"; // ★ 追加

interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
}

export default function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    onAddTodo(inputText);
    setInputText("");
  };

  return (
    <form className={styles.form}onSubmit=
    {handleSubmit}>
      <input type="text" 
      placeholder="add task" 
      className={styles.input} value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit" className={styles.button}>add</button>
    </form>
  );
}