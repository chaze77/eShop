import { appwriteKeys } from '@/appwrite/environment';
import { getDocumentById } from './api';

export const getCategoryById = async <T>(id: string): Promise<T> => {
  const response = await getDocumentById(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CATEGORIES_COLLECTION_ID,
    id
  );
  return response as T;
};
