// 'use client';

// TODO get components, lib back and use the animated list to display todos
// also get anything else from the old frontend that might be useful
// remove next stuff like favicon and public and others
// also change name of site/ metadata in layout
// rewrite layout and global css and page
// is there no way to make this work without 'use client' in page
// api health route

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
