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
import Container from '@/components/ui/Container';
import EmptyState from '@/components/common/EmtyState';
import LoaderOverlay from '@/components/ui/LoaderOverlay';
import {
  FILTERS,
  ICategory,
  IDirectory,
  IProduct,
  ISubCategory,
} from '@/types';
import { getProductsByFilters, getProductsBySubIds } from '@/lib/products';
import { getSubCategoriesByCategoryId } from '@/lib/subCategories';
import { getCategoryById } from '@/lib/categories';
import { collectUniqueItemToMap } from '@/helpers';
import { FilterKey, Selected } from '../types';

export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useParams();

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [subCategoryIds, setSubCategoryIds] = useState<string[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const [filtersOptions, setFiltersOptions] = useState<{
    subCategories: IDirectory[];
    sizes: IDirectory[];
    brands: IDirectory[];
    colors: IDirectory[];
  }>({ subCategories: [], sizes: [], brands: [], colors: [] });

  const categoryId = decodeURIComponent(id as string);

  useEffect(() => {
    async function loadCategory() {
      const uniqueSizesMap = new Map<string, IDirectory>();
      const uniqueBrandsMap = new Map<string, IDirectory>();
      const uniqueColorsMap = new Map<string, IDirectory>();
      const uniqueSubCategoriesMap = new Map<string, IDirectory>();

      const category: ICategory = await getCategoryById(categoryId);

      if (!category) return;
      setCategoryName(category?.name);

      const subCategoriesInfo = (await getSubCategoriesByCategoryId(
        categoryId
      )) as ISubCategory[];

      const urlSubId = searchParams.getAll(FILTERS.SUB_CATEGORIES);

      const idToUse =
        urlSubId.length > 0 ? urlSubId : subCategoriesInfo?.map((s) => s.$id);

      const productsBySubIds = await getProductsBySubIds(idToUse);

      setSubCategoryIds(idToUse);

      subCategoriesInfo.forEach((sub: ISubCategory) => {
        collectUniqueItemToMap(uniqueSubCategoriesMap, sub);
      });

      productsBySubIds.forEach((p) => {
        collectUniqueItemToMap(uniqueBrandsMap, p.brands);

        p.attributes?.forEach((a: any) => {
          collectUniqueItemToMap(uniqueSizesMap, a.size);
          collectUniqueItemToMap(uniqueColorsMap, a.colors);
        });
      });

      setFiltersOptions({
        subCategories: [...uniqueSubCategoriesMap.values()],
        brands: [...uniqueBrandsMap.values()],
        sizes: [...uniqueSizesMap.values()],
        colors: [...uniqueColorsMap.values()],
      });
    }

    loadCategory().catch((e) => {
      console.error('[loadCategory] error', e);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('app:error', {
            detail: 'Не удалось загрузить категорию. Проверьте интернет-соединение.',
          })
        );
      }
      setIsloading(false);
    });
  }, [categoryId]);

  useEffect(() => {
    async function loadProducts() {
      if (subCategoryIds.length === 0) {
        setProducts([]);
        return;
      }
      const selectedFromURL: Selected = {
        sizes: searchParams.getAll(FILTERS.SIZES),
        brands: searchParams.getAll(FILTERS.BRANDS),
        colors: searchParams.getAll(FILTERS.COLORS),
        subCategories: searchParams.getAll(FILTERS.SUB_CATEGORIES),
      };

      const res = await getProductsByFilters({
        subCategories: subCategoryIds,
        sizes: selectedFromURL.sizes,
        brands: selectedFromURL.brands,
        colors: selectedFromURL.colors,
      });

      setProducts(res);
    }
    if (subCategoryIds.length === 0) return;
    setIsloading(true);
    loadProducts()
      .catch((e) => {
        console.error('[loadProducts] error', e);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('app:error', {
              detail: 'Не удалось загрузить товары. Проверьте интернет-соединение.',
            })
          );
        }
      })
      .finally(() => setIsloading(false));
  }, [searchParams, subCategoryIds]);

  const setFilter = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(searchParams);
    const currentValues = next.getAll(key);
    const set = new Set(currentValues);
    const had = set.has(value);
    if (had) {
      set.delete(value);
    } else {
      set.add(value);
    }
    next.delete(key);
    const sorted = [...set].sort();
    sorted.forEach((v) => next.append(key, v));
    const url = `${pathname}?${next.toString()}`;
    router.replace(url, { scroll: false });
  };

  return (
    <Container className='max-w-[1500px] w-full'>
      <div className='flex gap-8 p-8'>
        <FilterSidebar
          subCategories={filtersOptions.subCategories}
          sizes={filtersOptions.sizes}
          brands={filtersOptions.brands}
          colors={filtersOptions.colors}
          setFilter={setFilter}
          selected={{
            sizes: searchParams.getAll(FILTERS.SIZES),
            brands: searchParams.getAll(FILTERS.BRANDS),
            colors: searchParams.getAll(FILTERS.COLORS),
            subCategories: searchParams.getAll(FILTERS.SUB_CATEGORIES),
          }}
        />
        <div className='flex-1'>
          <h1 className='text-2xl font-bold mb-4'>{categoryName}</h1>
          {products.length > 0 ? (
            <CategoryProducts products={products} />
          ) : (
            !isLoading && <EmptyState />
          )}
        </div>
      </div>
      {<LoaderOverlay show={isLoading} />}
    </Container>
  );
}
