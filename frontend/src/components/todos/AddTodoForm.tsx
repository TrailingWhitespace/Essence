
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface AddTodoFormProps {
  onAddTodo: (content: string) => void;
}

export function AddTodoForm({ onAddTodo }: AddTodoFormProps) {
  
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    // Prevent the default browser action of reloading the page
    event.preventDefault();

    // Don't add an empty todo
    if (inputText.trim().length === 0) {
      return;
    }

    // Call the function passed down from the parent
    onAddTodo(inputText);

    // Clear the input field for the next todo
    setInputText("");
  };

  return (
    
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-grow p-3 bg-gray-800 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        className="flex-shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white font-bold p-3 rounded-lg transition-colors disabled:opacity-50"
        disabled={!inputText.trim()}
      >
        <Plus size={24} />
      </button>
    </form>
  );
}