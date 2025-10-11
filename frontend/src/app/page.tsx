'use client';

import AnimatedList from '@/components/AnimatedList';

// TODO get components, lib back and use the animated list to display todos 
// also get anything else from the old frontend that might be useful
// remove next stuff like favicon and public and others
// also change name of site/ metadata in layout
// rewrite layout and global css and page
// is there no way to make this work without 'use client' in page
// api health route

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10'
];
export default function Home() {
  return (
   <main>
    <AnimatedList

  items={items}

  onItemSelect={(item, index) => console.log(item, index)}

  showGradients={true}

  enableArrowNavigation={true}

  displayScrollbar={true}

/>
   </main>
  );
}
