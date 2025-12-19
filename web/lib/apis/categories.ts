import { databases } from '@/appwrite/config';
import { appwriteKeys } from '@/appwrite/environment';

export const getCategoryById = async <T>(id: string): Promise<T> => {
  const response = await databases.getDocument(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CATEGORIES_COLLECTION_ID,
    id
  );
  return response as T;
};
