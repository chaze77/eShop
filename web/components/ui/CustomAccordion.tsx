'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import ArrayRight from '../icons/ArrayRight';

export default function CustomAccordion({ category }) {
  return (
    <Accordion className='w-full text-white'>
      {/* Основной пункт меню */}
      <AccordionItem
        className='text-white'
        title={category.label}
        indicator={<ArrayRight />}
      >
        {/* Подкатегории */}
        {category.subcategories?.map((subcategory) => (
          <div
            key={subcategory.key}
            className='py-2 text-sm text-gray-300 hover:text-white'
          >
            <a
              href='#'
              className='block w-full'
            >
              {subcategory.label}
            </a>
          </div>
        ))}
      </AccordionItem>
    </Accordion>
  );
}
