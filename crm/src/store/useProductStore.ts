import { IProduct } from '@/types';
import {
  createDocument,
  fetchDocuments,
  updateDocument,
  deleteDocument, // ✅ Добавляем deleteDocument
} from '@/utils/apiClient/apiClient';
import { Query } from 'appwrite';
import { create } from 'zustand';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_PRODUCTS_COLLECTION_ID;

interface ProductStore {
  products: IProduct[];
  product: IProduct | null;
  fetchProducts: (filters?: {
    description: string;
    brands?: string;
    subCategories: string[];
    price: number;
    color?: string;
    size?: string;
  }) => Promise<void>;
  fetchProductById: (productId: string) => Promise<void>;
  create: (formState: IProduct) => Promise<IProduct>;
  update: (id: string, formState: Partial<IProduct>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  product: null,

  fetchProducts: async (filters) => {
    try {
      const queryFilters: string[] = [];

      if (filters?.subCategories) {
        queryFilters.push(
          Query.equal('relatedCategory', filters.subCategories)
        );
      }
      if (filters?.brands) {
        queryFilters.push(Query.equal('brand', filters.brands));
      }
      if (filters?.color) {
        queryFilters.push(Query.equal('attributes.color', filters.color));
      }
      if (filters?.size) {
        queryFilters.push(Query.contains('attributes.size', filters.size));
      }

      const documents = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );

      set({ products: documents });
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  },

  fetchProductById: async (productId) => {
    try {
      const document = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('$id', productId)]
      );

      if (document.length > 0) {
        set({ product: document[0] });
      }
    } catch (error) {
      console.error('Ошибка при загрузке товара:', error);
    }
  },

  create: async (formState: Partial<IProduct>): Promise<IProduct> => {
    try {
      const createdProduct = await createDocument(DATABASE_ID, COLLECTION_ID, {
        ...formState,
      });
      const documents = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ products: documents });

      return createdProduct; // 🔥 **ВЕРНУТЬ объект продукта!**
    } catch (error) {
      console.error(`❌ Ошибка при создании в ${COLLECTION_ID}:`, error);
      throw error;
    }
  },

  update: async (id: string, formState: Partial<IProduct>): Promise<void> => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, {
        ...formState,
      });
      const documents = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ products: documents });
    } catch (error) {
      console.error(`❌ Ошибка при обновлении в ${COLLECTION_ID}:`, error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      console.log(`🗑️ Продукт с ID ${id} удален!`);

      const updatedProducts = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID
      );
      set({ products: updatedProducts });
    } catch (error) {
      console.error(`❌ Ошибка при удалении продукта ${id}:`, error);
      throw error;
    }
  },
}));
