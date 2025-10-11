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
import LightRays from '@/components/LightRays';
import PixelBlast from '@/components/PixelBlast';

export default async function Home() {
  const initialTodos = await getTodos();

  return (
//     <main className="relative bg-gray-900 min-h-screen overflow-hidden ">
//       <div className="absolute inset-0 z-0">
//         <LightRays
//       raysOrigin="top-center"
//       raysColor="#00ffff"
//       raysSpeed={1.5}
//       lightSpread={0.8}
//     />
//         <PixelBlast
//           variant="circle"
//           pixelSize={6}
//           color="#B19EEF"
//           patternScale={3}
//           patternDensity={1.2}
//           pixelSizeJitter={0.5}
//           enableRipples
//           rippleSpeed={0.4}
//           rippleThickness={0.12}
//           rippleIntensityScale={1.5}
//           liquid
//           liquidStrength={0.12}
//           liquidRadius={1.2}
//           liquidWobbleSpeed={5}
//           speed={0.6}
//           edgeFade={0.25}
//           transparent
//         />
//       </div>
// </main>
    <main className="w-screen h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      <div className="relative z-10 pt-40">
        <TodoList initialTodos={initialTodos} />
      </div>
    </main>
  );
}
