import React from 'react';

type Todo = {
  id: number;
  content: string;
  completed: boolean;
  createdAt: string;
};

// TODO Move this to lib/
async function getTodos(): Promise<Todo[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${apiUrl}/api/todos`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch`);
    return res.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export default async function TodoList() {
  const todos = await getTodos();
  let error: string | null = null;

  return (
    <ul className="space-y-4">
      {todos.length > 0 ? (
        todos.map((todo) => <li key={todo.id}>{todo.content}</li>)
      ) : (
        <p className="text-center text-gray-500">No todos</p>
      )}
    </ul>
  );
}
