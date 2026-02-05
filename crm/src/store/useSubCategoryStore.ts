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
import { MESSAGES } from '@/contstants/messages';

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
        queryFilters.push(Query.equal('relatedCategory', [filters.category]));
      }
      const documents = await fetchDocuments<ISubCategory>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );
      set({ subCategories: documents });
    } catch (error) {
      console.error(MESSAGES.toast.loadFail, error);
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
      console.error(MESSAGES.toast.loadFail, error);
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
      showMessage('success', MESSAGES.toast.subCategoryCreateSuccess);
    } catch (error) {
      console.error(MESSAGES.toast.createFail, error);
      showMessage('error', MESSAGES.toast.subCategoryCreateFail);
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
      showMessage('success', MESSAGES.toast.subCategoryUpdateSuccess);
    } catch (error) {
      console.error(MESSAGES.toast.updateFail, error);
      showMessage('error', MESSAGES.toast.subCategoryUpdateFail);
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
      showMessage('success', MESSAGES.toast.subCategoryDeleteSuccess);
    } catch (error) {
      console.error(MESSAGES.toast.deleteFail, error);
      showMessage('error', MESSAGES.toast.subCategoryDeleteFail);
    }
  },
}));

export default useSubCategoryStore;