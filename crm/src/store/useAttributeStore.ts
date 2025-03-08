import { IAttributes } from '@/types';
import {
  createDocument,
  fetchDocuments,
  updateDocument,
  deleteDocument, // импортируем функцию удаления документа
} from '@/utils/apiClient/apiClient';
import { create } from 'zustand';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_ATTRIBUTES_COLLECTION_ID;

// Определение типа стора
interface AttributeStore {
  attributes: IAttributes[];
  attribute: IAttributes | null;
  create: (formState: Omit<IAttributes, '$id'>) => Promise<IAttributes>;
  updateAttribute: (
    id: string,
    updatedData: Partial<Omit<IAttributes, '$id'>>
  ) => Promise<void>;
  deleteAttribute: (id: string) => Promise<void>;
  fetchAttributes: () => Promise<void>;
}

export const useAttributeStore = create<AttributeStore>((set) => ({
  attributes: [],
  attribute: null,

  create: async (formState: Omit<IAttributes, '$id'>): Promise<IAttributes> => {
    try {
      const createdAttribute = await createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        formState
      );
      set((state) => ({ attributes: [...state.attributes, createdAttribute] }));
      return createdAttribute;
    } catch (error) {
      console.error(`Ошибка при создании атрибута в ${COLLECTION_ID}:`, error);
      throw error;
    }
  },

  updateAttribute: async (
    id: string,
    updatedData: Partial<Omit<IAttributes, '$id'>>
  ): Promise<void> => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, updatedData);
      set((state) => ({
        attributes: state.attributes.map((attr) =>
          attr.$id === id ? { ...attr, ...updatedData } : attr
        ),
      }));
    } catch (error) {
      console.error(`Ошибка при обновлении атрибута ${id}:`, error);
      throw error;
    }
  },

  deleteAttribute: async (id: string): Promise<void> => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      set((state) => ({
        attributes: state.attributes.filter((attr) => attr.$id !== id),
      }));
    } catch (error) {
      console.error(`Ошибка при удалении атрибута ${id}:`, error);
      throw error;
    }
  },

  fetchAttributes: async () => {
    try {
      const documents = await fetchDocuments<IAttributes>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ attributes: documents });
    } catch (error) {
      console.error('Ошибка при загрузке атрибутов:', error);
    }
  },
}));
