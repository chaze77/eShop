import { databases } from '@/appwrite/config';
import { appwriteKeys } from '@/appwrite/environment';

export const getCategoryById = async <T>(id: string): Promise<T> => {
  try {
    const response = await databases.getDocument(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.CATEGORIES_COLLECTION_ID,
      id
    );
    return response as T;
  } catch (error) {
    const e = error as any;
    console.error('[getCategoryById] Appwrite error', {
      id,
      databaseId: appwriteKeys.DATABASE_ID,
      collectionId: appwriteKeys.CATEGORIES_COLLECTION_ID,
      endpoint: appwriteKeys.ENDPOINT,
      projectId: appwriteKeys.PROJECT_ID,
      code: e?.code,
      type: e?.type,
      message: e?.message,
      response: e?.response,
    });
    throw error;
  }
};
