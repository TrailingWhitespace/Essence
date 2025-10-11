'use client';

import React, { useState } from 'react';
import type { Todo } from '@/lib/todos';
import { addTodo, deleteTodo, reorderTodos, toggleTodo } from '@/lib/todos';
import { DragOrderList } from '@/components/ui/TodoDragOrderList';
import { AddTodoForm } from './AddTodoForm';

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
 
  const [todos, setTodos] = useState(initialTodos);

   const handleAddTodo = async (content: string) => { // <-- 2. Create the handler function
    try {
      const newTodo = await addTodo(content); 
      setTodos(currentTodos => [newTodo, ...currentTodos]); // Add to the top of the UI list
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleToggle = async (idToToggle: number) => {
  const todoToToggle = todos.find((todo) => todo.id === idToToggle);
  if (!todoToToggle) return;

  const originalTodos = todos;

  // 1. Optimistically update the UI immediately
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo,
    ),
  );

  try {
  
    await toggleTodo(idToToggle);
  } catch (error) {
    console.error('Failed to toggle todo:', error);
 
    setTodos(originalTodos);
  }
};

  const handleDelete = async (idToDelete: number) => {
  // 1. Keep a copy of the original list in case we need to revert
  const originalTodos = todos;


  setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== idToDelete));

  try {
 
    await deleteTodo(idToDelete);
  } catch (error) {
    console.error('Failed to delete todo:', error);

    setTodos(originalTodos);

  }
};

  const handleReorder = async (reorderedTodos: Todo[]) => {
  // Optimistically update the UI right away
  setTodos(reorderedTodos);

  // Create an array of just the IDs in the new order
  const idsInOrder = reorderedTodos.map(todo => todo.id);

  // Call the new API endpoint in the background
 await reorderTodos(idsInOrder);
};

  return (

    <div className="w-full max-w-2xl mx-auto">
      
      <div className="mb-8">
        <AddTodoForm onAddTodo={handleAddTodo} />
      </div>
      
      <DragOrderList
        items={todos}
        onReorder={handleReorder}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
