import React from 'react';
import { getTodos } from '@/lib/todos';
import TodoList from '@/components/todos/TodoList';

export default async function Home() {
  const initialTodos = await getTodos();

  return (
    <main className="w-screen min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      <div className='pt-10 pb-10'>
        <TodoList initialTodos={initialTodos} />
      </div>
    </main>
  );
}
