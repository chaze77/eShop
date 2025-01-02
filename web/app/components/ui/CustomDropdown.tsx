'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import Chevron from '../icons/Chevron';

export default function CustomDropdown({ category }) {
  return (
    <Dropdown className='p-0 min-w-20 mx-4'>
      <DropdownTrigger>
        <div className='header-items'>
          <span className='flex items-center gap-2 font-medium'>
            {category.label}
            <Chevron />
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={category.label}
        variant='faded'
        className='bg-headers'
      >
        {category.subcategories?.map((subcategory: any) => (
          <DropdownItem
            key={subcategory.key}
            aria-label={subcategory.label}
            className='text-white'
          >
            {subcategory.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
