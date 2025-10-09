'use client';

import React from 'react';

import { getTodos, Todo } from '@/lib/todos';

export default async function TodoList() {
  const todos = await getTodos();
  let error: string | null = null;

  return (
    <main>
      <ul className="space-y-4">
        {todos.length > 0 ? (
          todos.map((todo: Todo) => (
            <li key={todo.id}>
              {todo.id}: {todo.content} - {todo.completed ? 'Done' : 'Pending'}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No todos</p>
        )}
      </ul>
    </main>
  );
}
