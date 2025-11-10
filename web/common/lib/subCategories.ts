import { Query } from 'appwrite';
import { appwriteKeys } from '@/appwrite/environment';
import { fetchDocuments } from './api';

export const getSubCategoriesByCategoryId = async (categoryId: string) => {
  const response = await fetchDocuments(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.SUBCATEGORIES_COLLECTION_ID,
    [Query.equal('relatedCategory', categoryId)]
  );
  return response;
};
