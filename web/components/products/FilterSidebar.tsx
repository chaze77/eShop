'use client';

import {
  Accordion,
  AccordionItem,
  Chip,
  CheckboxGroup,
  Checkbox,
} from '@nextui-org/react';

interface FilterSidebarProps {
  sizes: { $id: string; name: string }[];
  brands: { $id: string; name: string }[];
  colors: { $id: string; name: string }[];
  subCategories: { $id: string; name: string }[];
  selected: {
    sizes: string[];
    brands: string[];
    colors: string[];
    subCategories: string[];
  };
  onToggleFilter: (
    key: 'subCategories' | 'sizes' | 'brands' | 'colors',
    value: string | string[]
  ) => void;
  activeBrandIds?: string[];
  activeSizeIds?: string[];
  activeColorIds?: string[];
}

const FilterSidebar = ({
  subCategories,
  sizes,
  brands,
  colors,
  selected,
  onToggleFilter,
  activeBrandIds = [],
  activeSizeIds = [],
  activeColorIds = [],
}: FilterSidebarProps) => {
  return (
    <aside className='p-4 border rounded w-full max-w-xs space-y-4'>
      {/* Подкатегории */}
      <Accordion>
        <AccordionItem
          key='subcategories'
          aria-label='Группы'
          title='Группы'
        >
          <div className='flex flex-wrap gap-2'>
            {subCategories.map((category) => {
              const isSelected = Array.isArray(selected.subCategories)
                ? selected.subCategories.includes(category.$id)
                : false;

              return (
                <button
                  key={category.$id}
                  onClick={() => onToggleFilter('subCategories', category.$id)}
                  className={`px-3 py-1 border rounded text-sm ${
                    isSelected ? 'bg-black text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>

      {/* Размеры */}
      <Accordion>
        <AccordionItem
          key='sizes'
          aria-label='Размеры'
          title='Размеры'
        >
          <div className='flex flex-wrap gap-2'>
            {sizes.map((size) => {
              const isSelected = Array.isArray(selected.sizes)
                ? selected.sizes.includes(size.$id)
                : false;

              const isActive = activeSizeIds.includes(size.$id);
              return (
                <Chip
                  key={size.$id}
                  onClick={() => onToggleFilter('sizes', size.$id)}
                  className={`
                    px-3 py-1 border rounded text-sm cursor-pointer
                    ${isSelected ? 'bg-blue text-white' : 'hover:bg-gray-200'}
                    ${!isActive ? 'opacity-50 italic' : ''}
                  `}
                >
                  {size.name}
                </Chip>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>

      {/* Бренды */}
      <Accordion>
        <AccordionItem
          key='brands'
          aria-label='Бренд'
          title='Бренд'
        >
          <CheckboxGroup
            orientation='vertical'
            value={selected.brands}
            onValueChange={(newValues) =>
              onToggleFilter('brands', newValues as string[])
            }
          >
            {brands.map((brand) => {
              if (!brand?.$id) return null;

              const isActive = activeBrandIds.includes(brand.$id);

              return (
                <Checkbox
                  key={brand.$id}
                  value={brand.$id}
                  className={!isActive ? 'opacity-50 italic' : ''}
                >
                  {brand.name}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        </AccordionItem>
      </Accordion>

      {/* Цвета */}
      <div>
        <h3 className='font-bold mb-2'>Цвета</h3>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => {
            const isSelected = Array.isArray(selected.colors)
              ? selected.colors.includes(color.$id)
              : false;

            const isActive = activeColorIds.includes(color.$id);
            return (
              <button
                key={color.$id}
                onClick={() => onToggleFilter('colors', color.$id)}
                className={`
                  px-3 py-1 border rounded text-sm
                  ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-200'}
                  ${!isActive ? 'opacity-50 italic' : ''}
                `}
              >
                {color.name}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
