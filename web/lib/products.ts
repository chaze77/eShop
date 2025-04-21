import { Query } from 'appwrite';
import { databases } from '@/appwrite/config';

const DB_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const PRODUCTS = process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID!;
const ATTRIBUTES = process.env.NEXT_PUBLIC_ATTRIBUTES_COLLECTION_ID!;

export const getProductsBySubCategoryIds = async (
  subCategoryIds: string[],
  filters: {
    sizes?: string[];
    brands?: string[];
    colors?: string[];
    subCategories?: string[];
    minPrice?: number;
    maxPrice?: number;
  } = {}
): Promise<any[]> => {
  console.log('📥 [filters получены]:', filters);

  const productQueries = [Query.equal('subCategories', subCategoryIds)];
  console.log('🔗 [subCategories]:', subCategoryIds);

  if (filters.brands?.length) {
    productQueries.push(Query.equal('brands', filters.brands));
    console.log('🏷 [brands]:', filters.brands);
  }

  if (filters.subCategories?.length) {
    productQueries.push(Query.equal('subCategories', filters.subCategories));
    console.log('🏷 [brands]:', filters.brands);
  }

  // Цены (если нужно)
  // if (filters.minPrice !== undefined) {
  //   productQueries.push(Query.greaterThanEqual('price', filters.minPrice));
  // }
  // if (filters.maxPrice !== undefined) {
  //   productQueries.push(Query.lessThanEqual('price', filters.maxPrice));
  // }

  let attributeProductIds: string[] = [];

  if ((filters.sizes?.length || filters.colors?.length)) {
    const attrQueries: string[] = [];

    if (filters.sizes?.length) {
      attrQueries.push(Query.equal('size', filters.sizes));
      console.log('📏 [size filter]:', filters.sizes);
    }

    if (filters.colors?.length) {
      attrQueries.push(Query.equal('colors', filters.colors));
      console.log('🎨 [color filter]:', filters.colors);
    }

    const attrResponse = await databases.listDocuments(DB_ID, ATTRIBUTES, attrQueries);
    console.log('📋 [raw attrResponse]:', attrResponse);

    attributeProductIds = attrResponse.documents.map((doc) => doc.products.$id);
    console.log('📦 [product IDs из attributes]:', attributeProductIds);

    if (attributeProductIds.length === 0) {
      console.warn('⚠️ [нет совпадений по атрибутам]');
      return [];
    }

    productQueries.push(Query.equal('$id', attributeProductIds));
  }

  console.log('🧩 [Итоговый productQuery]:', productQueries);

  const response = await databases.listDocuments(DB_ID, PRODUCTS, productQueries);

  console.log('✅ [products получены]:', response.documents);

  return response.documents as any[];
};
