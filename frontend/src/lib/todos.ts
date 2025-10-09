const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Todo = {
  id: number;
  content: string;
  completed: boolean;
  createdAt: string;
};

async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch(`${API_URL}/api/todos`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch`);
    return res.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

async function addTodo(content: string) {
  const res = await fetch(`${API_URL}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

async function toggleTodo(id: number) {
  const res = await fetch(`${API_URL}/api/todos/${id}/toggle`, {
    method: 'PUT',
  });
  return res.json();
}

async function deleteTodo(id: number) {
  await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'DELETE',
  });
}

export { getTodos, addTodo, toggleTodo, deleteTodo };

// Types are often exported separately like this for clarity
export type { Todo };
