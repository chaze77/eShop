'use client';

import { FilterKey, Selected } from '@/app/category/types';
import FilterAccordion from '../ui/FilterAccordion';

interface FilterSidebarProps {
  sizes: { $id: string; name: string }[];
  brands: { $id: string; name: string }[];
  colors: { $id: string; name: string }[];
  subCategories: { $id: string; name: string }[];
  setFilter: (key: FilterKey, value: string) => void;
  selected: Selected;
}

const FilterSidebar = ({
  sizes,
  brands,
  colors,
  subCategories,
  setFilter,
  selected,
}: FilterSidebarProps) => {
  return (
    <aside className='p-4 border rounded w-full max-w-xs space-y-4'>
      <FilterAccordion
        accordingKey='subCategories'
        title='группы'
        filterItems={subCategories}
        setFilter={setFilter}
        selected={selected}
      />
      <FilterAccordion
        accordingKey='brands'
        title='бренды'
        filterItems={brands}
        setFilter={setFilter}
        selected={selected}
      />
      <FilterAccordion
        accordingKey='sizes'
        title='размеры'
        filterItems={sizes}
        setFilter={setFilter}
        selected={selected}
      />
      <FilterAccordion
        accordingKey='colors'
        title='цвета'
        filterItems={colors}
        setFilter={setFilter}
        selected={selected}
      />
    </aside>
  );
};

export default FilterSidebar;
