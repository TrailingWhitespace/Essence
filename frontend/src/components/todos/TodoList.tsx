'use client';

import React, { useState } from 'react';
import type { Todo } from '@/lib/todos';
import { addTodo, deleteTodo, reorderTodos, toggleTodo } from '@/lib/todos';
import { DragOrderList } from '@/components/ui/TodoDragOrderList';
import { AddTodoForm } from './AddTodoForm';
import { get } from 'http';

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = async (content: string) => {
    try {
      const newTodo = await addTodo(content);
      setTodos((currentTodos) => [newTodo, ...currentTodos]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  // do i want this to remember where the todo was in the order after its untoggled or is moving it to the top fine?
  // incase of multiple completed todos, should the latest completed one go to the bottom of the completed list or the top?
  const handleToggle = async (idToToggle: number) => {

    const todoToToggle = todos.find((todo) => todo.id === idToToggle);
    if (!todoToToggle) return;

    const originalTodos = todos;

    let list = todos.map((todo) =>
      todo.id === idToToggle ? { ...todo, completed: !todo.completed } : todo,
    );
   
    const completed = list.filter((todo) => todo.completed);

    const incomplete = list.filter((todo) => !todo.completed);

    let updated: Todo[] = [];
    const getTodo = list.find((todo) => todo.id === idToToggle);

    if (!getTodo) return;

    if (getTodo.completed) {
      updated = [...incomplete, ...completed];
    } else {
      updated = [getTodo, ...incomplete.filter((todo) => todo.id !== idToToggle), ...completed];
    }

    setTodos(updated);
    
    try {
      await toggleTodo(idToToggle);
      const idsInOrder = updated.map((todo) => todo.id);
    await reorderTodos(idsInOrder);
    } catch (error) {
      console.error('Failed to toggle todo:', error);

      setTodos(originalTodos);
    }
  };

  const handleDelete = async (idToDelete: number) => {
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
    setTodos(reorderedTodos);

    const idsInOrder = reorderedTodos.map((todo) => todo.id);

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
