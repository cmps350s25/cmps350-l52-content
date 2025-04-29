import { fetchTodos } from './actions';
import TodoForm from "./TodoForm";

export default async function TodoPage() {
  const todos = await fetchTodos();
  return <TodoForm initialTodos={todos} />;
}
