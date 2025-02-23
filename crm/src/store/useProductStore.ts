import { IDirectory } from '@/types';
import { fetchDocuments } from '@/utils/apiClient/apiClient';
import { Query } from 'appwrite';
import { create } from 'zustand';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_PRODUCTS_COLLECTION_ID;

interface Product {
  $id: string;
  name: string;
  description: string;
  brands: IDirectory;
  price: string;
  subCategories: IDirectory;
  attributes: {
    $id: string;
    colors: IDirectory;
    size: IDirectory;
    quantity: number;
  }[];
}

interface ProductStore {
  products: Product[];
  product: Product | null;
  fetchProducts: (filters?: {
    description: string;
    brands?: string;
    subCategories: string[];
    price: number;
    color?: string;
    size?: string;
  }) => Promise<void>;
  fetchProductById: (productId: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  product: null,

  /** 🔹 Получаем список товаров с фильтрацией */
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

      const documents = await fetchDocuments<Product>(
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
      const document = await fetchDocuments<Product>(
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
}));
