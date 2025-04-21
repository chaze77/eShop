'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import CategoryProducts from '@/components/products/CategoryProducts';
import FilterSidebar from '@/components/products/FilterSidebar';
import { getCategoryById } from '@/lib/categories';
import { getProductsBySubCategoryIds } from '@/lib/products';
import { getSubCategoriesByCategoryId } from '@/lib/subCategories';
import { ICategory } from '@/types';
import Container from '@/components/ui/Container';


export default function Page() {
  const params = useParams();

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [filtersData, setFiltersData] = useState({
    subCategories: [] as { $id: string; name: string }[],
    sizes: [] as { $id: string; name: string }[],
    brands: [] as { $id: string; name: string }[],
    colors: [] as { $id: string; name: string }[],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
    subCategories:  [] as string[],
    
  });

   
  const toggleFilter = (key:'subCategories'| 'sizes' | 'brands' | 'colors', value: string) => {
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
      console.log('📦 categoryId:', categoryId);
  
      const category: ICategory = await getCategoryById(categoryId);
      console.log('📂 category:', category);
      if (!category) {
        console.warn('⚠️ category не найден');
        return;
      }
  
      setCategoryName(category.name);
      console.log('✅ Установлено имя категории:', category.name);
  
      const subCategories = await getSubCategoriesByCategoryId(category.$id);
      console.log('🧩 subCategories:', subCategories);
  
      const subCategoryIds = subCategories.map((sub) => sub.$id);
      console.log('🔗 subCategoryIds:', subCategoryIds);
  
      const products = await getProductsBySubCategoryIds(
        subCategoryIds,
        selectedFilters
      );
      console.log('🛍 products:', products);
  
      setProducts(products);
  
      const sizes = new Map();
      const brands = new Map();
      const colors = new Map();
  
      products.forEach((p) => {
        console.log('📦 Продукт:', p);
        p.attributes.forEach((a: any) => {
          console.log('🎯 Атрибут:', a);
          if (a.size?.$id) sizes.set(a.size.$id, a.size);
          if (a.colors?.$id) colors.set(a.colors.$id, a.colors);
        });
        if (p.brands?.$id) brands.set(p.brands.$id, p.brands);
      });
  
      const filters = {
        sizes: Array.from(sizes.values()),
        brands: Array.from(brands.values()),
        colors: Array.from(colors.values()),
        subCategories
      };
  
      console.log('🔧 filtersData:', filters);
  
      setFiltersData(filters);
    }
  
    fetchData();
  }, [params.id, selectedFilters]);
  

  return (
    <Container className='max-w-[1500px] w-full'>
 <div className='flex gap-8 p-8'>
  <FilterSidebar
  subCategories ={filtersData.subCategories}
  sizes={filtersData.sizes}
  brands={filtersData.brands}
  colors={filtersData.colors}
  selected={selectedFilters}
  onToggleFilter={toggleFilter}
/>

      <div className='flex-1'>
        <h1 className='text-2xl font-bold mb-4'>{categoryName}</h1>
        <CategoryProducts products={products} />
      </div>
    </div>
    </Container>
   
  );
}
