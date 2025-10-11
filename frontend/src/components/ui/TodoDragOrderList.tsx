'use client';

import React, { useEffect } from 'react';
import {
  useMotionValue,
  MotionValue,
  Reorder,
  useDragControls,
  motion,
  animate,
  DragControls,
  useMotionValueEvent,
} from 'framer-motion';
import { GripVertical, Check, Trash } from 'lucide-react';
import type { Todo } from '@/lib/todos';

// --- The new, more powerful props interface ---
interface DragOrderListProps {
  items: Todo[]; // The list to display
  onReorder: (items: Todo[]) => void; // A function to call when the list is reordered
  onToggle: (id: number) => void; // A function to call when a checkbox is clicked
  onDelete: (id: number) => void; // A function to call when the trash is clicked
}

// --- The "Dumb" Parent Component ---
export function DragOrderList({ items, onReorder, onToggle, onDelete }: DragOrderListProps) {
  // NO useState here anymore! It just receives the list and functions.

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className="space-y-4 w-full max-w-2xl mx-auto"
    >
      {items.map((item) => (
        <DragOrderItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </Reorder.Group>
  );
}

// --- The Child Component (mostly unchanged, just uses props) ---
function DragOrderItem({
  item,
  onToggle,
  onDelete,
}: {
  item: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      className={`flex justify-between items-center p-4 rounded-xl border shadow-sm transition-colors ${
        item.completed ? 'bg-gray-700 border-black' : 'bg-gray-800 border-white'
      }`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={() => onToggle(item.id)}
          className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-all duration-200 ${
            item.completed ? 'border-green-500 bg-green-500' : 'border-gray-500 hover:bg-gray-700'
          }`}
        >
          {item.completed && <Check className="w-5 h-5 text-white" />}
        </button>
        <div className="flex flex-col">
          <h2
            className={`text-lg font-semibold ${item.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}
          >
            {item.content}
          </h2>
          <span className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true, // Use AM/PM
            })}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
      >
        <Trash className="w-5 h-5" />
      </button>
      <ReorderHandle dragControls={dragControls} />
    </Reorder.Item>
  );
}

function ReorderHandle({ dragControls }: { dragControls: DragControls }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      onPointerDown={(e) => {
        e.preventDefault();

        dragControls.start(e);
      }}
      className="cursor-grab active:cursor-grabbing p-2 text-muted-foreground"
    >
      <GripVertical />
    </motion.div>
  );
}

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)';

function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useMotionValueEvent(value, 'change', (latest) => {
    if (latest !== 0) {
      // If the item is being dragged, animate in the shadow.
      animate(boxShadow, '5px 5px 15px rgba(0,0,0,0.15)');
    } else {
      // If the item is dropped, animate the shadow away.
      animate(boxShadow, inactiveShadow);
    }
  });

  return boxShadow;
}
