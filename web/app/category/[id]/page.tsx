'use client';

import { useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';

import CategoryProducts from '@/components/products/CategoryProducts';
import FilterSidebar from '@/components/products/FilterSidebar';
import { getCategoryById } from '@/lib/categories';
import { getProductsBySubCategoryIds } from '@/lib/products';
import { getSubCategoriesByCategoryId } from '@/lib/subCategories';
import { ICategory, IProduct } from '@/types';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/common/EmtyState';

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [initialFilters, setInitialFilters] = useState({
    subCategories: [] as { $id: string; name: string }[],
    sizes: [] as { $id: string; name: string }[],
    brands: [] as { $id: string; name: string }[],
    colors: [] as { $id: string; name: string }[],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    sizes: [] as string[],
    brands: [] as string[],
    colors: [] as string[],
    subCategories: [] as string[],
  });

  const [activeSizeIds, setActiveSizeIds] = useState<string[]>([]);
  const [activeBrandIds, setActiveBrandIds] = useState<string[]>([]);
  const [activeColorIds, setActiveColorIds] = useState<string[]>([]);

  const setFilter = (
    key: keyof typeof selectedFilters,
    valueOrValues: string | string[]
  ) => {
    let updated: string[];

    if (Array.isArray(valueOrValues)) {
      updated = valueOrValues;
    } else {
      const exists = selectedFilters[key].includes(valueOrValues);
      updated = exists
        ? selectedFilters[key].filter((v) => v !== valueOrValues)
        : [...selectedFilters[key], valueOrValues];
    }

    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    currentParams.delete(key);
    updated.forEach((v) => currentParams.append(key, v));

    setSelectedFilters((prev) => ({
      ...prev,
      [key]: updated,
    }));

    setTimeout(() => {
      router.push(`${pathname}?${currentParams.toString()}`);
    }, 0);
  };

  useEffect(() => {
    async function loadInitialFilters() {
      const categoryId = decodeURIComponent(params.id as string);
      const category: ICategory = await getCategoryById(categoryId);
      if (!category) return;

      setCategoryName(category.name);

      const subCategories = await getSubCategoriesByCategoryId(category.$id);
      const subCategoryIds = subCategories.map((s) => s.$id);

      // Поддержка и subCategories и subcategory
      const filters = {
        sizes: searchParams.getAll('sizes'),
        brands: searchParams.getAll('brands'),
        colors: searchParams.getAll('colors'),
        subCategories: searchParams.getAll('subCategories').length
          ? searchParams.getAll('subCategories')
          : searchParams.getAll('subcategory'),
      };

      setSelectedFilters(filters);

      const allProducts = await getProductsBySubCategoryIds(subCategoryIds, {
        sizes: [],
        brands: [],
        colors: [],
        subCategories: [],
      });

      const sizes = new Map();
      const brands = new Map();
      const colors = new Map();

      allProducts.forEach((p) => {
        p.attributes.forEach((a: any) => {
          if (a.size?.$id) sizes.set(a.size.$id, a.size);
          if (a.colors?.$id) colors.set(a.colors.$id, a.colors);
        });
        if (p.brands?.$id) brands.set(p.brands.$id, p.brands);
      });

      setInitialFilters({
        subCategories,
        sizes: Array.from(sizes.values()),
        brands: Array.from(brands.values()),
        colors: Array.from(colors.values()),
      });

      const filteredProducts = await getProductsBySubCategoryIds(
        subCategoryIds,
        filters
      );
      setProducts(filteredProducts);

      const sizeIds: string[] = [];
      const brandIds: string[] = [];
      const colorIds: string[] = [];

      filteredProducts.forEach((p) => {
        p.attributes.forEach((a: any) => {
          if (a.size?.$id) sizeIds.push(a.size.$id);
          if (a.colors?.$id) colorIds.push(a.colors.$id);
        });
        if (p.brands?.$id) brandIds.push(p.brands.$id);
      });

      setActiveSizeIds([...new Set(sizeIds)]);
      setActiveBrandIds([...new Set(brandIds)]);
      setActiveColorIds([...new Set(colorIds)]);
    }

    loadInitialFilters();
  }, [params.id, searchParams]);

  return (
    <Container className='max-w-[1500px] w-full'>
      <div className='flex gap-8 p-8'>
        <FilterSidebar
          subCategories={initialFilters.subCategories}
          sizes={initialFilters.sizes}
          brands={initialFilters.brands}
          colors={initialFilters.colors}
          selected={selectedFilters}
          onToggleFilter={setFilter}
          activeBrandIds={activeBrandIds}
          activeSizeIds={activeSizeIds}
          activeColorIds={activeColorIds}
        />
        <div className='flex-1'>
          <h1 className='text-2xl font-bold mb-4'>{categoryName}</h1>
          {products.length > 0 ? (
            <CategoryProducts products={products} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </Container>
  );
}
