import { appwriteKeys } from '@/appwrite/environment';
import { getDocumentById } from './api';
import { IProduct } from '@/common/types';

export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    const response = await getDocumentById(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.PRODUCTS_COLLECTION_ID,
      id
    );
    return response as IProduct;
  } catch (error) {
    // Важно для Vercel: Appwrite часто возвращает 404 и при отсутствии прав.
    const e = error as any;
    console.error('[getProductById] Appwrite error', {
      id,
      databaseId: appwriteKeys.DATABASE_ID,
      collectionId: appwriteKeys.PRODUCTS_COLLECTION_ID,
      endpoint: appwriteKeys.ENDPOINT,
      projectId: appwriteKeys.PROJECT_ID,
      code: e?.code,
      type: e?.type,
      message: e?.message,
      response: e?.response,
    });
    return null;
  }
};
