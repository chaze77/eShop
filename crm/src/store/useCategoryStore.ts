import { create } from 'zustand';
import {
  fetchDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from '@/utils/apiClient/apiClient';
import { ICategory } from '../types';
import showMessage from '@/utils/showMessage/showMessage';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_CATEGORIES_COLLECTION_ID;

interface CategoryStore {
  categories: ICategory[];
  category: ICategory | null;
  fetchCategories: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  resetCategory: () => void;
  create: (formState: { name: string }) => Promise<void>;
  update: (id: string, formState: { name: string }) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  category: null,

  fetchCategories: async () => {
    try {
      const documents = await fetchDocuments<ICategory>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ categories: documents });
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  },

  getById: async (id: string) => {
    try {
      const document = await getDocumentById<ICategory>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      set({ category: document });
    } catch (error) {
      console.error('Ошибка при получении категории:', error);
    }
  },

  resetCategory: () => set({ category: null }),

  create: async (formState: { name: string }) => {
    try {
      await createDocument(DATABASE_ID, COLLECTION_ID, { ...formState });
      const documents = await fetchDocuments<ICategory>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ categories: documents });
      showMessage('success', 'Category successfully created');
    } catch (error) {
      console.error('Ошибка при создании категории:', error);
      showMessage('error', 'Failed to create category');
    }
  },

  update: async (id: string, formState: { name: string }) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      const documents = await fetchDocuments<ICategory>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ categories: documents });
      showMessage('success', 'Category successfully updated');
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      showMessage('error', 'Failed to update category');
    }
  },

  delete: async (id: string) => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      const documents = await fetchDocuments<ICategory>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ categories: documents });
      showMessage('success', 'Category successfully deleted');
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
      showMessage('error', 'Failed to delete category');
    }
  },
}));

export default useCategoryStore;
