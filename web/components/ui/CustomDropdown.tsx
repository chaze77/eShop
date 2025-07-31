'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import Chevron from '../icons/Chevron';
import { ICategory, ISubCategory } from '../../types/index';
import { useRouter } from 'next/navigation';

export default function CustomDropdown({ category }: { category: ICategory }) {
  const router = useRouter();

  const handleSubcategoryClick = (subcategoryId: string) => {
    router.push(`/category/${category.$id}?subCategories=${subcategoryId}`);
  };

  return (
    <Dropdown className='p-0 min-w-20 mx-4'>
      <DropdownTrigger>
        <div className='header-items cursor-pointer'>
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
            className='text-white cursor-pointer'
            onClick={() => handleSubcategoryClick(subcategory.$id)}
          >
            {subcategory.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
