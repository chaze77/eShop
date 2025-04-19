import { databases } from '@/appwrite/config';
import { Query } from 'appwrite';

const DB_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const CATEGORIES = process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID!;

// lib/data/categories.ts
export const getCategoryById = async <T>(id: string): Promise<T> => {
  console.log('[getCategoryById] payload:', {
    id,
  });

  const response = await databases.getDocument(DB_ID, CATEGORIES, id);

  return response as T;
};
