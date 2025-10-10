'use client';

import AnimatedList from '@/components/AnimatedList';



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
