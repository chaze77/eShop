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
    <Dropdown className='p-0'>
      <DropdownTrigger>
        <div className='header-items'>
          <span className='flex items-center gap-2'>
            {category.label}
            <Chevron />
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={category.label}
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
