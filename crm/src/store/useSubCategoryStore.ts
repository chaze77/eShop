import { create } from 'zustand';
import {
  fetchDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from '@/utils/apiClient/apiClient';
import { ISubCategory } from '@/types';
import showMessage from '@/utils/showMessage/showMessage';
import { Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_SUBCATEGORIES_COLLECTION_ID;

interface SubCategoryStore {
  subCategories: ISubCategory[];
  subCategory: ISubCategory | null;
  fetchSubCategories: (filters?: { category?: string }) => Promise<void>;
  getById: (id: string) => Promise<void>;
  resetSubCategory: () => void;
  create: (formState: {
    name: string;
    relatedCategory: string;
  }) => Promise<void>;
  update: (
    id: string,
    formState: { name: string; relatedCategory: string }
  ) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const useSubCategoryStore = create<SubCategoryStore>((set) => ({
  subCategories: [],
  subCategory: null,

  fetchSubCategories: async (filters?: { category?: string }) => {
    try {
      const queryFilters: string[] = [];
      if (filters?.category) {
        console.log(filters, 'filters');

        queryFilters.push(Query.equal('relatedCategory', [filters.category]));
      }
      const documents = await fetchDocuments<ISubCategory>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );
      set({ subCategories: documents });
    } catch (error) {
      console.error('Ошибка при загрузке подкатегорий:', error);
    }
  },

  getById: async (id: string) => {
    try {
      const document = await getDocumentById<ISubCategory>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      set({ subCategory: document });
    } catch (error) {
      console.error('Ошибка при получении подкатегории:', error);
    }
  },

  resetSubCategory: () => set({ subCategory: null }),

  create: async (formState: { name: string; relatedCategory: string }) => {
    try {
      await createDocument(DATABASE_ID, COLLECTION_ID, { ...formState });
      const documents = await fetchDocuments<ISubCategory>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ subCategories: documents });
      showMessage('success', 'SubCategory successfully created');
    } catch (error) {
      console.error('Ошибка при создании подкатегории:', error);
      showMessage('error', 'Failed to create subcategory');
    }
  },

  update: async (
    id: string,
    formState: { name: string; relatedCategory: string }
  ) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      const documents = await fetchDocuments<ISubCategory>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ subCategories: documents });
      showMessage('success', 'SubCategory successfully updated');
    } catch (error) {
      console.error('Ошибка при обновлении подкатегории:', error);
      showMessage('error', 'Failed to update subcategory');
    }
  },

  delete: async (id: string) => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      const documents = await fetchDocuments<ISubCategory>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ subCategories: documents });
      showMessage('success', 'SubCategory successfully deleted');
    } catch (error) {
      console.error('Ошибка при удалении подкатегории:', error);
      showMessage('error', 'Failed to delete subcategory');
    }
  },
}));

export default useSubCategoryStore;
