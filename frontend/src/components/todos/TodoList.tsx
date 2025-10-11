'use client';

import React, { useState } from 'react';
import type { Todo } from '@/lib/todos';
import { DragOrderList } from '@/components/ui/DragOrderList';

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  // This is now the SINGLE SOURCE OF TRUTH for our list.
  const [todos, setTodos] = useState(initialTodos);

  // All our logic lives here. We will add API calls to these functions.
  const handleToggle = (idToToggle: number) => {
    // Here you would call your toggle API function
    console.log(`Toggling todo with id: ${idToToggle}`);
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (idToDelete: number) => {
    // Here you would call your delete API function
    console.log(`Deleting todo with id: ${idToDelete}`);
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== idToDelete));
  };

  function handleReorder(reorderedTodos: Todo[]) {
    // Here you could call an API to save the new order
    console.log('List has been reordered.');
    setTodos(reorderedTodos);
  }

  return (
    <DragOrderList
      items={todos}
      onReorder={handleReorder}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  );
}
