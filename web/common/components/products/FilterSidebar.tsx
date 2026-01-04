'use client';

import { Flex } from 'antd';
import FilterAccordion from '../ui/FilterAccordion';
import { FilterKey, Selected } from '@/app/category/types';

interface FilterItem {
  $id: string;
  name: string;
}

interface FilterSidebarProps {
  sizes: FilterItem[];
  brands: FilterItem[];
  colors: FilterItem[];
  subCategories: FilterItem[];
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
  const filters = [
    { key: 'subCategories', title: 'группы', items: subCategories },
    { key: 'brands', title: 'бренды', items: brands },
    { key: 'sizes', title: 'размеры', items: sizes },
    { key: 'colors', title: 'цвета', items: colors },
  ] as const;

  return (
    // <aside style={{ border: '1px solid red', minWidth: '300px' }}>
    <Flex
      vertical
      gap='large'
      justify='flex-start'
      align='flex-start'
      style={{ minWidth: 200 }}
    >
      {filters.map(
        ({ key, title, items }) =>
          items.length > 0 && (
            <FilterAccordion
              key={key}
              accordingKey={key}
              title={title}
              filterItems={items}
              setFilter={setFilter}
              selected={selected}
            />
          )
      )}
    </Flex>
    // </aside>
  );
};

export default FilterSidebar;
