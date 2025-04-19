'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import CategoryProducts from '@/components/products/CategoryProducts';
import FilterSidebar from '@/components/products/FilterSidebar';
import { getCategoryById } from '@/lib/categories';
import { getProductsBySubCategoryIds } from '@/lib/products';
import { getSubCategoriesByCategoryId } from '@/lib/subCategories';

export default function Page() {
  const params = useParams();

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [filtersData, setFiltersData] = useState({
    sizes: [] as { $id: string; name: string }[],
    brands: [] as { $id: string; name: string }[],
    colors: [] as { $id: string; name: string }[],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
  });

  const toggleFilter = (key: 'sizes' | 'brands' | 'colors', value: string) => {
    setSelectedFilters((prev) => {
      const exists = prev[key].includes(value);
      const updated = exists
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];

      return { ...prev, [key]: updated };
    });
  };

  useEffect(() => {
    async function fetchData() {
      const categoryId = decodeURIComponent(params.id as string);
      const category = await getCategoryById(categoryId);
      if (!category) return;

      setCategoryName(category.name);

      const subCategories = await getSubCategoriesByCategoryId(category.$id);
      const subCategoryIds = subCategories.map((sub) => sub.$id);

      const products = await getProductsBySubCategoryIds(
        subCategoryIds,
        selectedFilters
      );
      setProducts(products);

      const sizes = new Map();
      const brands = new Map();
      const colors = new Map();

      products.forEach((p) => {
        p.attributes.forEach((a: any) => {
          if (a.size?.$id) sizes.set(a.size.$id, a.size);
          if (a.colors?.$id) colors.set(a.colors.$id, a.colors);
        });
        if (p.brands?.$id) brands.set(p.brands.$id, p.brands);
      });

      setFiltersData({
        sizes: Array.from(sizes.values()),
        brands: Array.from(brands.values()),
        colors: Array.from(colors.values()),
      });
    }

    fetchData();
  }, [params.id, selectedFilters]);

  return (
    <div className='flex gap-8 p-8'>
      <FilterSidebar
        sizes={filtersData.sizes}
        brands={filtersData.brands}
        colors={filtersData.colors}
        selected={selectedFilters}
        onToggle={toggleFilter}
      />
      <div className='flex-1'>
        <h1 className='text-2xl font-bold mb-4'>{categoryName}</h1>
        <CategoryProducts products={products} />
      </div>
    </div>
  );
}
