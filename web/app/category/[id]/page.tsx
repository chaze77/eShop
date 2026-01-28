'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import FilterSidebar from '@/common/components/products/FilterSidebar';
import {
  FILTERSTYPE,
  ICategory,
  IDirectory,
  IProduct,
  ISubCategory,
} from '@/common/types';
import EmptyState from '@/common/components/ui/EmtyState';
import { getProductsByFilters, getProductsBySubIds } from '@/lib/apis/products';
import { getSubCategoriesByCategoryId } from '@/lib/apis/subCategories';
import { getCategoryById } from '@/lib/apis/categories';
import { collectUniqueItemToMap } from '@/helpers';
import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { Flex } from 'antd';
import PageShell from '@/common/components/layouts/PageShell';
import ProductList from '@/common/components/products/ProductList';

import { useFilterQuery } from '@/common/hooks/useFilterQuery'; // <-- поправь путь
import useFavorites from '../../../common/hooks/useFavorites';

export default function Page() {
  const { id } = useParams();

  const { selected, queryString, toggleFilter } = useFilterQuery();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [subCategoryIds, setSubCategoryIds] = useState<string[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

      setCategoryName(category.name);

      const subCategoriesInfo = (await getSubCategoriesByCategoryId(
        categoryId,
      )) as ISubCategory[];

      const urlSubId = selected.subCategories;

      const idToUse =
        urlSubId.length > 0 ? urlSubId : subCategoriesInfo.map((s) => s.$id);

      const productsBySubIds = await getProductsBySubIds(idToUse);

      setSubCategoryIds(idToUse);

      subCategoriesInfo.forEach((sub) => {
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

    setLoadingOptions(true);
    loadCategory()
      .catch((e) => console.error('[loadCategory] error', e))
      .finally(() => setLoadingOptions(false));
  }, [categoryId, selected.subCategories]);

  useEffect(() => {
    async function loadProducts() {
      if (subCategoryIds.length === 0) return;

      const sp = new URLSearchParams(queryString);

      const res = await getProductsByFilters({
        subCategories: subCategoryIds,
        sizes: sp.getAll(FILTERSTYPE.SIZES),
        brands: sp.getAll(FILTERSTYPE.BRANDS),
        colors: sp.getAll(FILTERSTYPE.COLORS),
      });

      setProducts(res);
    }

    setLoadingProducts(true);
    loadProducts()
      .catch((e) => console.error('[loadProducts] error', e))
      .finally(() => setLoadingProducts(false));
  }, [queryString, subCategoryIds]);

  return (
    <PageShell>
      <Flex gap='large'>
        <FilterSidebar
          subCategories={filtersOptions.subCategories}
          sizes={filtersOptions.sizes}
          brands={filtersOptions.brands}
          colors={filtersOptions.colors}
          setFilter={toggleFilter}
          selected={selected}
        />

        <div>
          <h1>{categoryName.toUpperCase()}</h1>

          {products.length > 0 ? (
            <ProductList
              items={products}
              columns={3}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            !loadingOptions && !loadingProducts && <EmptyState />
          )}
        </div>

        <LoaderOverlay show={loadingOptions || loadingProducts} />
      </Flex>
    </PageShell>
  );
}
