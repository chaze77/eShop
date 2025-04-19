'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
  sizes: string[];
  brands: { $id: string; name: string }[]; // или можешь типизировать подробнее, если у тебя есть интерфейс бренда
  colors: string[];
}

const FilterSidebar = ({ sizes, brands, colors }: FilterSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    console.log('params', params);

    const current = params.get(key)?.split(',') || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    params.set(key, updated.join(','));
    router.push(`?${params.toString()}`);
  };

  return (
    <aside className='p-4 border rounded w-full max-w-xs space-y-4'>
      <div>
        <h3 className='font-bold mb-2'>Размеры</h3>
        <div className='flex flex-wrap gap-2'>
          {sizes.map((size) => (
            <button
              key={size.$id}
              onClick={() => toggleQueryParam('sizes', size)}
              className='px-3 py-1 border rounded text-sm hover:bg-gray-200'
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className='font-bold mb-2'>Бренды</h3>
        <div className='flex flex-wrap gap-2'>
          {brands.map((brand) => (
            <button
              key={brand.$id}
              onClick={() => toggleQueryParam('brands', brand.$id)}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className='font-bold mb-2'>Цвета</h3>
        <div className='flex flex-wrap gap-2'>
          {colors.map((color) => (
            <button
              key={color.$id}
              onClick={() => toggleQueryParam('colors', color)}
              className='px-3 py-1 border rounded text-sm hover:bg-gray-200'
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
