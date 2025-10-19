'use client';

import React, { useState } from 'react';
import type { Todo } from '@/lib/todos';
import { addTodo, deleteTodo, reorderTodos, toggleTodo, updateTodo } from '@/lib/todos';
import { DragOrderList } from '@/components/ui/TodoDragOrderList';
import { AddTodoForm } from './AddTodoForm';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos);
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = async (id: number) => {
    setEditingId(id);
  }

  const handleSave = async (id: number, newContent: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, content: newContent } : todo
      )
    );
    updateTodo(id, newContent);
    setEditingId(null);
  }

  const handleAddTodo = async (content: string) => {
    try {
      const newTodo = await addTodo(content);
      setTodos((currentTodos) => [newTodo, ...currentTodos]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

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



const handleReorder = async (reorderedItems: Todo[]) => {

  const originalTodos = todos;
  let newFullList: Todo[] = [];

  if (reorderedItems[0].completed) {
    // We just reordered the COMPLETED list.
    const incompleteTodos = todos.filter(todo => !todo.completed);
    newFullList = [...incompleteTodos, ...reorderedItems];
  } else {
    // We just reordered the INCOMPLETE list.
    const completedTodos = todos.filter(todo => todo.completed);
    newFullList = [...reorderedItems, ...completedTodos];
  }

  // Optimistically update the UI with the full, correct list.
  setTodos(newFullList);

  // Now, make the API call with the IDs from the new full list.
  const idsInOrder = newFullList.map(todo => todo.id);
  try {
    await reorderTodos(idsInOrder);
  } catch (error) {
    console.error("Failed to save new order:", error);
    setTodos(originalTodos); // Revert on failure.
  }
};

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <AddTodoForm onAddTodo={handleAddTodo} />
      </div>

      <div className='space-y-4'>
        <DragOrderList
        items={incompleteTodos}
        onReorder={handleReorder}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onStartEdit={handleEdit}
        editingId={editingId}
        onEditSave={handleSave}
      />

        {completedTodos.length > 0 && (
          <CollapsibleSection title='Completed Todos' defaultOpen={false}>
            <DragOrderList
              items={completedTodos}
              onReorder={handleReorder}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onStartEdit={handleEdit}
              editingId={editingId}
              onEditSave={handleSave}
            />
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
}

