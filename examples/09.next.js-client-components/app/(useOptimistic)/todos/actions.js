"use server";

import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "todos.json");

export async function createTodo(text) {
  await new Promise((res) => setTimeout(res, 1000)); // simulate delay
  const todo = { id: Date.now() % 100, text };

  try {
    // Read current todos
    const data = await readFile(filePath, "utf8");
    const todos = JSON.parse(data);

    // Add new todo
    todos.push(todo);

    // Write updated list
    await writeFile(filePath, JSON.stringify(todos, null, 2), "utf8");

    return todo;
  } catch (error) {
    console.error("Error saving todo:", error);
    throw new Error("Could not save todo");
  }
}

export async function fetchTodos() {
  try {
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
