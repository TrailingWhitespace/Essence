'use client';

import React, { useState } from 'react';
import type { Todo } from '@/lib/todos';
import { deleteTodo, toggleTodo } from '@/lib/todos';
import { DragOrderList } from '@/components/ui/TodoDragOrderList';

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  // This is now the SINGLE SOURCE OF TRUTH for our list.
  const [todos, setTodos] = useState(initialTodos);

  const handleToggle = async (idToToggle: number) => {
    // Find the todo we're about to toggle to get its current status
    const todoToToggle = todos.find((todo) => todo.id === idToToggle);
    if (!todoToToggle) return;

    try {
      // 2. Call the API first
      await toggleTodo(idToToggle);

      // 3. Then, update the UI state. This is an "optimistic update"
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      // Optional: Add logic here to revert the UI change if the API call fails
    }
  };

  const handleDelete = async (idToDelete: number) => {
    try {
      // 1. Call the API first to delete it from the database
      await deleteTodo(idToDelete);

      // 2. Then, update the UI by filtering it out of the list
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== idToDelete));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      // Optional: Show an error message to the user
    }
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
