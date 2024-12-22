'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import Chevron from '../icons/Chevron';

export default function CustomDropdown({ category }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='light'>
          <span className='flex items-center gap-2'>
            {category.label}
            <Chevron />
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={category.label}>
        {category.subcategories?.map((subcategory: any) => (
          <DropdownItem
            key={subcategory.key}
            aria-label={subcategory.label}
          >
            {subcategory.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
