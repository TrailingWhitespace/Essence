'use client';

import React, { useState, useEffect } from 'react'; 
import { getTodos, Todo } from '@/lib/todos';
import AnimatedList from '@/components/AnimatedList';

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {

  const [todos, setTodos] = useState(initialTodos);


 return (
    <main>
      <AnimatedList
        items={todos.map(todo => todo.content)}
        onItemSelect={(item, index) => console.log(item, index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      />
    </main>
  );
}