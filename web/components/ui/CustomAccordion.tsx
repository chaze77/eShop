'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import ArrayRight from '../icons/ArrayRight';
import { useRouter } from 'next/navigation';
import { ICategory } from '@/types';

export default function CustomAccordion({ category }: { category: ICategory }) {
  const router = useRouter();

  console.log(category, 'cat123');

  const handleSubcategoryClick = (subcategoryKey: string) => {
    router.push(`/category/${category.$id}?subcategory=${subcategoryKey}`);
  };

  return (
    <Accordion className='w-full text-white'>
      <AccordionItem
        className='text-white'
        title={category.name}
        indicator={<ArrayRight />}
      >
        {category.subCategories?.map((subcategory) => (
          <div
            key={subcategory.$id}
            className='py-2 text-sm text-gray-300 hover:text-white cursor-pointer'
            onClick={() => handleSubcategoryClick(subcategory.$id)}
          >
            {subcategory.name}
          </div>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
