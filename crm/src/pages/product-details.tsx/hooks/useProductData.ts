import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import useSubCategoryStore from '@/store/useSubCategoryStore';
import useBrandStore from '@/store/useBrandStore';
import useColorStore from '@/store/useColorStore';
import useSizeStore from '@/store/useSizeStore';
import useTagStore from '@/store/useTagsStore';

export const useProductData = () => {
  const { id } = useParams();
  const getById = useProductStore((state) => state.fetchProductById);
  const product = useProductStore((state) => state.product);

  const subCategoriesSelect = useSubCategoryStore(
    (state) => state.subCategories,
  );
  const fetchSubCategories = useSubCategoryStore(
    (state) => state.fetchSubCategories,
  );

  const brands = useBrandStore((state) => state.items);
  const fetchBrands = useBrandStore((state) => state.fetchItems);

  const colors = useColorStore((state) => state.items);
  const fetchColors = useColorStore((state) => state.fetchItems);

  const sizes = useSizeStore((state) => state.items);
  const fetchSizes = useSizeStore((state) => state.fetchItems);

  const tagsColl = useTagStore((state) => state.items);
  const fetchTags = useTagStore((state) => state.fetchItems);

  // Флаг загрузки или ошибки можно добавить по необходимости
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getById(id, { expand: true }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id, getById]);

  useEffect(() => {
    if (subCategoriesSelect.length === 0) fetchSubCategories();
    if (brands.length === 0) fetchBrands();
    if (colors.length === 0) fetchColors();
    if (sizes.length === 0) fetchSizes();
    if (tagsColl.length === 0) fetchTags();
  }, []);

  return {
    id,
    product,
    subCategoriesSelect,
    brands,
    colors,
    sizes,
    tagsColl,
    loading,
  };
};
