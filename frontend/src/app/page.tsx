import React from 'react';
import TodoList from '@/components/todos/TodoList';

export default async function HomePage() {
  return (
    <main>
      <h1>Home dayo</h1>
      <TodoList />
    </main>
  );
}
