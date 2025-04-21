'use client';

interface FilterSidebarProps {
  sizes: { $id: string; name: string }[];
  brands: { $id: string; name: string }[];
  colors: { $id: string; name: string }[];
  subCategories: { $id: string; name: string }[];
  selected: {
    sizes: string[];
    brands: string[];
    colors: string[];
    subCategories: string[]
  };
  onToggleFilter: (key: 'subCategories' | 'sizes' | 'brands' | 'colors', value: string) => void;
}

const FilterSidebar = ({ subCategories, sizes, brands, colors, selected, onToggleFilter }: FilterSidebarProps) => {
  return (
    <aside className='p-4 border rounded w-full max-w-xs space-y-4'>
        <div>
        <h3 className='font-bold mb-2'>Группы</h3>
        <div className='flex flex-wrap gap-2'>
          {subCategories.map((category) => {
            const isSelected = selected.subCategories.includes(category.$id);
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
      </div>
      <div>
        <h3 className='font-bold mb-2'>Размеры</h3>
        <div className='flex flex-wrap gap-2'>
          {sizes.map((size) => {
            const isSelected = selected.sizes.includes(size.$id);
            return (
              <button
                key={size.$id}
                onClick={() => onToggleFilter('sizes', size.$id)}
                className={`px-3 py-1 border rounded text-sm ${
                  isSelected ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`}
              >
                {size.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className='font-bold mb-2'>Бренды</h3>
        <div className='flex flex-wrap gap-2'>
          {brands.map((brand) => {
            const isSelected = selected.brands.includes(brand.$id);
            return (
              <button
                key={brand.$id}
                onClick={() => onToggleFilter('brands', brand.$id)}
                className={`px-3 py-1 border rounded text-sm ${
                  isSelected ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`}
              >
                {brand.name}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className='font-bold mb-2'>Цвета</h3>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => {
            const isSelected = selected.colors.includes(color.$id);
            return (
              <button
                key={color.$id}
                onClick={() => onToggleFilter('colors', color.$id)}
                className={`px-3 py-1 border rounded text-sm ${
                  isSelected ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`}
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
