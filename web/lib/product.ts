import { getDocumentById } from './api';
import { IProduct } from '@/types';

const DB_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const PRODUCTS = process.env.NEXT_PUBLIC_PRODUCTS_COLLECTION_ID!;

export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    const response = await getDocumentById(DB_ID, PRODUCTS, id);
    return response as IProduct;
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};
