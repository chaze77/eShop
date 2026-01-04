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
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};
