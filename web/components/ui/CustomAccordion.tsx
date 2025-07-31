'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import ArrayRight from '../icons/ArrayRight';
import { useRouter } from 'next/navigation';

export default function CustomAccordion({ category }) {
  const router = useRouter();

  console.log(category, 'cat123');

  const handleSubcategoryClick = (subcategoryKey) => {
    // Переход на страницу категории с query параметром фильтра
    router.push(`/category/${category.key}?subcategory=${subcategoryKey}`);
  };

  return (
    <Accordion className='w-full text-white'>
      <AccordionItem
        className='text-white'
        title={category.label}
        indicator={<ArrayRight />}
      >
        {category.subcategories?.map((subcategory) => (
          <div
            key={subcategory.key}
            className='py-2 text-sm text-gray-300 hover:text-white cursor-pointer'
            onClick={() => handleSubcategoryClick(subcategory.key)}
          >
            {subcategory.label}
          </div>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
