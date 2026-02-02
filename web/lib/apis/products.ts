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
  let productQueries = [];

  if (filters.brands?.length) {
    productQueries.push(Query.equal('brands', filters.brands));
  }

  if (filters.subCategories?.length) {
    productQueries.push(Query.equal('subCategories', filters.subCategories));
  }

  let attributeProductIds: string[] = [];

  if (filters.sizes?.length || filters.colors?.length) {
    const attrQueries: string[] = [];

    if (filters.sizes?.length) {
      attrQueries.push(Query.equal('size', filters.sizes));
    }

    if (filters.colors?.length) {
      attrQueries.push(Query.equal('colors', filters.colors));
    }

    const attrResponse = await fetchDocuments(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.ATTRIBUTES_COLLECTION_ID,
      attrQueries,
    );

    attributeProductIds = attrResponse.map((doc: any) => doc.products.$id);

    if (attributeProductIds.length === 0) {
      return [];
    }

    productQueries.push(Query.equal('$id', attributeProductIds));
  }

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
