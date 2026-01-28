import { Query } from 'appwrite';
import { IProduct } from '@/common/types';
import { fetchDocuments } from './api';
import { appwriteKeys } from '@/appwrite/environment';

export const getProductsByFilters = async (
  filters: {
    sizes?: string[];
    brands?: string[];
    colors?: string[];
    subCategories?: string[];
    minPrice?: number;
    maxPrice?: number;
  } = {},
): Promise<any[]> => {
  console.log('📥 [filters получены]:', filters);

  let productQueries = [];

  if (filters.brands?.length) {
    productQueries.push(Query.equal('brands', filters.brands));
    // console.log('🏷 [brands]:', filters.brands);
  }

  if (filters.subCategories?.length) {
    productQueries.push(Query.equal('subCategories', filters.subCategories));
    // console.log('🏷 [brands]:', filters.subCategories);
  }

  let attributeProductIds: string[] = [];

  if (filters.sizes?.length || filters.colors?.length) {
    const attrQueries: string[] = [];

    if (filters.sizes?.length) {
      attrQueries.push(Query.equal('size', filters.sizes));
      // console.log('📏 [size filter]:', filters.sizes);
    }

    if (filters.colors?.length) {
      attrQueries.push(Query.equal('colors', filters.colors));
      // console.log('🎨 [color filter]:', filters.colors);
    }

    const attrResponse = await fetchDocuments(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.ATTRIBUTES_COLLECTION_ID,
      attrQueries,
    );
    // console.log('📋 [raw attrResponse]:', attrResponse);

    attributeProductIds = attrResponse.map((doc: any) => doc.products.$id);
    // console.log('📦 [product IDs из attributes]:', attributeProductIds);

    if (attributeProductIds.length === 0) {
      // console.warn('⚠️ [нет совпадений по атрибутам]');
      return [];
    }

    productQueries.push(Query.equal('$id', attributeProductIds));
  }

  // console.log('🧩 [Итоговый productQuery]:', productQueries);

  const response = await fetchDocuments(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.PRODUCTS_COLLECTION_ID,
    productQueries,
  );

  return response as any[];
};

export const getProductsByName = async (value: string): Promise<IProduct[]> => {
  const query = [Query.contains('name', value)];

  try {
    const response = await fetchDocuments(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.PRODUCTS_COLLECTION_ID,
      query,
    );

    return response as IProduct[];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getProductsBySubIds = async (
  subIds: any[],
): Promise<IProduct[]> => {
  const queries = [Query.equal('subCategories', subIds)];
  try {
    const response = await fetchDocuments(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.PRODUCTS_COLLECTION_ID,
      queries,
    );

    return response as IProduct[];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getProductsByIds = async (ids: string[]): Promise<IProduct[]> => {
  if (!ids.length) return [];

  const queries = [Query.equal('$id', ids)];

  const response = await fetchDocuments<IProduct>(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.PRODUCTS_COLLECTION_ID,
    queries,
  );

  return response;
};
