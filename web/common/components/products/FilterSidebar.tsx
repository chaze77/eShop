'use client';

import { Flex } from 'antd';
import FilterAccordion from '../ui/FilterAccordion';
import { FilterKey, Selected } from '@/app/category/types';
import { FILTERSTYPE } from '@/common/types';
import { labels } from '@/constants/labels';

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
    {
      key: FILTERSTYPE.SUBCATEGORIES,
      title: labels.filters.subCategories,
      items: subCategories,
    },
    { key: FILTERSTYPE.BRANDS, title: labels.filters.brands, items: brands },
    { key: FILTERSTYPE.SIZES, title: labels.filters.sizes, items: sizes },
    { key: FILTERSTYPE.COLORS, title: labels.filters.colors, items: colors },
  ] as const;

  return (
    <aside style={{ minWidth: '200px' }}>
      <Flex
        vertical
        gap='large'
        justify='flex-start'
        align='flex-start'
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
            ),
        )}
      </Flex>
    </aside>
  );
};

export default FilterSidebar;
