import { Query } from 'appwrite';
import { databases } from '@/appwrite/config';

const DB_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const PRODUCTS = process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID!;

export const getProductsBySubCategoryIds = async (
  subCategoryIds: string[],
  filters: {
    sizes?: string[];
    brands?: string[];
    colors?: string[];
    minPrice?: number;
    maxPrice?: number;
  } = {}
): Promise<any[]> => {
  const queries = [Query.equal('subCategories', subCategoryIds)];

  //   if (filters.minPrice !== undefined) {
  //     queries.push(Query.greaterThanEqual('price', filters.minPrice));
  //   }

  //   if (filters.maxPrice !== undefined) {
  //     queries.push(Query.lessThanEqual('price', filters.maxPrice));
  //   }

  if (filters.sizes?.length) {
    queries.push(Query.equal('attributes.size.name', filters.sizes));
  }

  if (filters.brands?.length) {
    queries.push(Query.equal('brands.name', filters.brands));
  }

  if (filters.colors?.length) {
    queries.push(Query.equal('attributes.colors.name', filters.colors));
  }

  const response = await databases.listDocuments(DB_ID, PRODUCTS, queries);
  return response.documents as any[];
};
