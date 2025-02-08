'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import Chevron from '../icons/Chevron';
import { ICategory, ISubCategory } from '../../../types/index';

export default function CustomDropdown({ category }: { category: ICategory }) {
  console.log(category, 'category');

  return (
    <Dropdown className='p-0 min-w-20 mx-4'>
      <DropdownTrigger>
        <div className='header-items'>
          <span className='flex items-center gap-2 font-medium'>
            {category.name}
            <Chevron />
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={category.name}
        variant='faded'
        className='bg-headers'
      >
        {category.subCategories?.map((subcategory: ISubCategory) => (
          <DropdownItem
            key={subcategory.$id}
            aria-label={subcategory.name}
            className='text-white'
          >
            {subcategory.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
