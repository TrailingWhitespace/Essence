import React from 'react';
import { getTodos } from '@/lib/todos';
import TodoList from '@/components/todos/TodoList';

export default async function Home() {
  const initialTodos = await getTodos();

  return (
    <main className="w-screen h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      <div className="relative z-10 pt-40">
        <TodoList initialTodos={initialTodos} />
      </div>
    </main>
  );
}
