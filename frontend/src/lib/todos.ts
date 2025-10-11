export type Todo = {
  id: number;
  content: string;
  completed: boolean;
  createdAt: string;
};

function getBaseUrl(): string {
  const isServer = typeof window === 'undefined';

  const apiUrl = isServer ? process.env.API_URL_INTERNAL : process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiUrl) {
    const varName = isServer ? 'API_URL_INTERNAL' : 'NEXT_PUBLIC_API_BASE_URL';
    throw new Error(`Environment variable ${varName} is not set.`);
  }

  return apiUrl;
}

export async function getTodos(): Promise<Todo[]> {
  try {
    const API_URL = getBaseUrl();
    const res = await fetch(`${API_URL}/api/todos`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch`);
    return res.json();
  } catch (error) {
    console.error('Fetch Error in getTodos:', error);
    return [];
  }
}

export async function addTodo(content: string) {
  const API_URL = getBaseUrl();
  const res = await fetch(`${API_URL}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  return res.json();
}

export async function toggleTodo(id: number) {
  const API_URL = getBaseUrl();
  const res = await fetch(`${API_URL}/api/todos/${id}/toggle`, {
    method: 'PUT',
  });
  return res.json();
}

export async function deleteTodo(id: number) {
  const API_URL = getBaseUrl();
  await fetch(`${API_URL}/api/todos/${id}`, {
    method: 'DELETE',
  });
}

export async function reorderTodos(idsInOrder: number[]) {
  const API_URL = getBaseUrl();
 await fetch(`${API_URL}/api/todos/reorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order: idsInOrder }),
  });
}