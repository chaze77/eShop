import { IProduct } from '@/types';
import {
  createDocument,
  fetchDocuments,
  updateDocument,
  deleteDocument,
} from '@/utils/apiClient/apiClient';
import { Query } from 'appwrite';
import { create } from 'zustand';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_PRODUCTS_COLLECTION_ID;

interface ProductStore {
  products: IProduct[];
  product: IProduct | null;
  fetchProducts: (filters?: {
    desc?: string;
    brands?: string;
    subCategories?: string[];
    price?: number;
    color?: string;
    size?: string;
  }) => Promise<void>;
  fetchProductById: (productId: string) => Promise<void>;
  create: (formState: Omit<IProduct, '$id'>) => Promise<IProduct>;
  update: (
    id: string,
    formState: Partial<Omit<IProduct, '$id'>>
  ) => Promise<void>;
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
          Query.equal('subCategories.$id', filters.subCategories)
        );
      }
      if (filters?.brands) {
        queryFilters.push(Query.equal('brands.$id', filters.brands));
      }
      if (filters?.color) {
        queryFilters.push(Query.equal('attributes.colors.$id', filters.color));
      }
      if (filters?.size) {
        queryFilters.push(Query.equal('attributes.size.$id', filters.size));
      }

      const documents = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        queryFilters
      );
      set({ products: documents });
    } catch (error) {
      console.error('❌ Ошибка при загрузке товаров:', error);
    }
  },

  fetchProductById: async (productId) => {
    try {
      const document = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('$id', productId)]
      );
      set({ product: document[0] || null });
    } catch (error) {
      console.error('❌ Ошибка при загрузке товара:', error);
    }
  },

  create: async (formState: Omit<IProduct, '$id'>): Promise<IProduct> => {
    try {
      const createdProduct = await createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        formState
      );
      set((state) => ({ products: [...state.products, createdProduct] }));
      return createdProduct;
    } catch (error) {
      console.error('❌ Ошибка при создании товара:', error);
      throw error;
    }
  },

  update: async (
    id: string,
    formState: Partial<Omit<IProduct, '$id'>>
  ): Promise<void> => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, formState);
      set((state) => ({
        products: state.products.map((product) =>
          product.$id === id ? { ...product, ...formState } : product
        ),
      }));
    } catch (error) {
      console.error('❌ Ошибка при обновлении товара:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      console.log(`Продукт с ID ${id} удален!`);
      set((state) => ({
        products: state.products.filter((product) => product.$id !== id),
      }));
    } catch (error) {
      console.error(`Ошибка при удалении товара ${id}:`, error);
      throw error;
    }
  },
}));
