'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import FilterSidebar from '@/common/components/products/FilterSidebar';
import FilterAccordion from '@/common/components/ui/FilterAccordion/FilterAccordion';
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
import { DownOutlined } from '@ant-design/icons';
import PageShell from '@/common/components/layouts/PageShell';
import ProductList from '@/common/components/products/ProductList';

import { useFilterQuery } from '@/common/hooks/useFilterQuery'; // <-- поправь путь
import useFavorites from '../../../common/hooks/useFavorites';
import { labels } from '@/constants/labels';
import './category-page.css';

export default function Page() {
  const { id } = useParams();

  const { selected, queryString, toggleFilter } = useFilterQuery();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [subCategoryIds, setSubCategoryIds] = useState<string[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<
    'categories' | 'filters' | null
  >(null);

  const [filtersOptions, setFiltersOptions] = useState<{
    subCategories: IDirectory[];
    sizes: IDirectory[];
    brands: IDirectory[];
    colors: IDirectory[];
  }>({ subCategories: [], sizes: [], brands: [], colors: [] });

  const categoryId = decodeURIComponent(id as string);

  const toggleMobilePanel = (panel: 'categories' | 'filters') => {
    setMobilePanel((prev) => (prev === panel ? null : panel));
  };

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
      <div className='category-page'>
        <aside className='category-page__sidebar'>
          <FilterSidebar
            subCategories={filtersOptions.subCategories}
            sizes={filtersOptions.sizes}
            brands={filtersOptions.brands}
            colors={filtersOptions.colors}
            setFilter={toggleFilter}
            selected={selected}
          />
        </aside>

        <div className='category-page__content'>
          <div className='category-page__header'>
            <div>
              <h1 className='category-page__title'>
                {categoryName.toUpperCase()}
              </h1>
              <div className='category-page__count'>
                {products.length} товаров
              </div>
            </div>
          </div>

          <div className='category-page__mobile-controls'>
            <button
              type='button'
              className='category-page__mobile-button'
              onClick={() => toggleMobilePanel('categories')}
              aria-expanded={mobilePanel === 'categories'}
            >
              Категории
              <DownOutlined className='category-page__chevron' />
            </button>
            <button
              type='button'
              className='category-page__mobile-button'
              onClick={() => toggleMobilePanel('filters')}
              aria-expanded={mobilePanel === 'filters'}
            >
              Открыть фильтры
              <DownOutlined className='category-page__chevron' />
            </button>
          </div>

          {mobilePanel === 'categories' && (
            <div className='category-page__mobile-panel'>
              {filtersOptions.subCategories.length > 0 && (
                <FilterAccordion
                  accordingKey={FILTERSTYPE.SUBCATEGORIES}
                  title={labels.filters.subCategories}
                  filterItems={filtersOptions.subCategories}
                  setFilter={toggleFilter}
                  selected={selected}
                />
              )}
            </div>
          )}

          {mobilePanel === 'filters' && (
            <div className='category-page__mobile-panel'>
              {filtersOptions.brands.length > 0 && (
                <FilterAccordion
                  accordingKey={FILTERSTYPE.BRANDS}
                  title={labels.filters.brands}
                  filterItems={filtersOptions.brands}
                  setFilter={toggleFilter}
                  selected={selected}
                />
              )}
              {filtersOptions.sizes.length > 0 && (
                <FilterAccordion
                  accordingKey={FILTERSTYPE.SIZES}
                  title={labels.filters.sizes}
                  filterItems={filtersOptions.sizes}
                  setFilter={toggleFilter}
                  selected={selected}
                />
              )}
              {filtersOptions.colors.length > 0 && (
                <FilterAccordion
                  accordingKey={FILTERSTYPE.COLORS}
                  title={labels.filters.colors}
                  filterItems={filtersOptions.colors}
                  setFilter={toggleFilter}
                  selected={selected}
                />
              )}
            </div>
          )}

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
      </div>
    </PageShell>
  );
}
