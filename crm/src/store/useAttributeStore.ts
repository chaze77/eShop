import { IAttributes } from '@/types';
import {
  createDocument,
  fetchDocuments,
  updateDocument,
} from '@/utils/apiClient/apiClient';
import { create } from 'zustand';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_ATTRIBUTES_COLLECTION_ID;

// Определение типа стора
interface AttributeStore {
  attributes: IAttributes[];
  attribute: IAttributes | null;
  create: (formState: IAttributes) => Promise<IAttributes>;
  updateAttribute: (
    id: string,
    updatedData: Partial<IAttributes>
  ) => Promise<void>;
  fetchAttributes: () => Promise<void>;
}

export const useAttributeStore = create<AttributeStore>((set) => ({
  attributes: [],
  attribute: null,

  // ✅ Функция создания атрибута
  create: async (formState: Partial<IAttributes>): Promise<IAttributes> => {
    try {
      const createdAttribute = await createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        formState
      );

      return createdAttribute;
    } catch (error) {
      console.error(
        `❌ Ошибка при создании атрибута в ${COLLECTION_ID}:`,
        error
      );
      throw error;
    }
  },

  // ✅ Функция обновления атрибута
  updateAttribute: async (
    id: string,
    updatedData: Partial<IAttributes>
  ): Promise<void> => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, updatedData);
    } catch (error) {
      console.error(`❌ Ошибка при обновлении атрибута ${id}:`, error);
      throw error;
    }
  },

  // ✅ Функция загрузки всех атрибутов
  fetchAttributes: async () => {
    try {
      const documents = await fetchDocuments<IAttributes>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ attributes: documents });
    } catch (error) {
      console.error('❌ Ошибка при загрузке атрибутов:', error);
    }
  },
}));
