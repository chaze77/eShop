import { IBlog } from '@/common/types';
import { fetchDocuments, getDocumentById } from './api';
import { appwriteKeys } from '@/appwrite/environment';

export const getBlogs = async (): Promise<IBlog[] | null> => {
  try {
    const response = await fetchDocuments(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.BLOG_ID
    );
    return response as IBlog[];
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};

export const getBlogById = async (id: string): Promise<IBlog | null> => {
  try {
    const response = await getDocumentById(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.BLOG_ID,
      id
    );
    return response as IBlog;
  } catch (error) {
    console.error('Ошибка при получении продукта:', error);
    return null;
  }
};
