import { Query } from 'appwrite';
import { databases } from '@/appwrite/config';

const DB_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const SUBCATEGORIES = process.env.NEXT_PUBLIC_SUBCATEGORIES_COLLECTION_ID!;

export const getSubCategoriesByCategoryId = async (categoryId: string) => {
  const response = await databases.listDocuments(DB_ID, SUBCATEGORIES, [
    Query.equal('relatedCategory', categoryId),
  ]);
  return response.documents;
};
