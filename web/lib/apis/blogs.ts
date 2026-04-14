import { IBlog } from '@/common/types';
import { fetchDocuments, getDocumentById } from './api';
import { appwriteKeys } from '@/appwrite/environment';
import { cacheLife } from 'next/cache';
import { Query } from 'appwrite';

export const getBlogs = async (): Promise<IBlog[] | null> => {
  'use cache';
  cacheLife('days');
  const query = [Query.equal('active', true)];
  try {
    const response = await fetchDocuments(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.BLOG_ID,
      query,
    );
    return response as IBlog[];
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};

export const getBlogById = async (id: string): Promise<IBlog | null> => {
  'use cache';
  cacheLife('days');
  try {
    const response = await getDocumentById(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.BLOG_ID,
      id,
    );
    return response as IBlog;
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};
