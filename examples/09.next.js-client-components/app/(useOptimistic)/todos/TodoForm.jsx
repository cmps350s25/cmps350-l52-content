"use client";

import { useState, useOptimistic } from "react";
import { createTodo } from "./actions";

export default function TodoForm({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (prev, newTodo) => [...prev, newTodo]
  );

  async function action(formData) {
    const text = formData.get("todo");
    const optimisticTodo = { id: "temp-" + Date.now() % 100, text };

    addOptimisticTodo(optimisticTodo); // Update UI immediately
    const savedToDo = await createTodo(text); // Call shared server action
    setTodos((prev) => [...prev, savedToDo]); // Confirm with real data
  }

  return (
    <form action={action}>
      <input type="text" name="todo" placeholder="New task..." required />
      <button type="submit">Add</button>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id}>
            {todo.text} - {todo.id}
          </li>
        ))}
      </ul>
    </form>
  );
}
