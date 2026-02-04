import { IProduct } from '@/types';
import {
  createDocument,
  fetchDocuments,
  updateDocument,
  deleteDocument,
} from '@/utils/apiClient/apiClient';

import { create } from 'zustand';
import { Models, Query } from 'appwrite';

export type AppwriteRow<T> = Models.Row & T;

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_PRODUCTS_COLLECTION_ID;
type ProductAttributeInput = {
  $id?: string;
  quantity?: number;
  colors?: string;
  size?: string;
};

type ProductUpsertInput = {
  id?: string;
  name: string;
  desc?: string;
  price: string;
  subCategories?: string;
  brands?: string;
  tags?: string[];
  image?: string | File;
  attributes?: ProductAttributeInput[];
};

interface ProductStore {
  products: IProduct[];
  product: IProduct | null;
  fetchProducts: (
    filters?: {
      desc?: string;
      brands?: string;
      subCategories?: string[];
      price?: number;
      color?: string;
      size?: string;
    },
    options?: { expand?: boolean },
  ) => Promise<void>;
  fetchProductById: (
    productId: string,
    opntion?: { expand: boolean },
  ) => Promise<void>;
  create: (formState: Omit<IProduct, '$id'>) => Promise<Models.DefaultRow>;
  update: (
    id: string,
    formState: Partial<Omit<IProduct, '$id'>>,
  ) => Promise<void>;
  delete: (id: string) => Promise<void>;
  upsertWithAttributes: (input: ProductUpsertInput) => Promise<string>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  product: null,

  fetchProducts: async (filters, options?: { expand?: boolean }) => {
    try {
      const queries: string[] = [];

      if (options?.expand) {
        queries.push(
          Query.select([
            '*',
            'brands.*',
            'subCategories.*',
            'attributes.*',
          ]),
        );
      }

      if (filters?.subCategories) {
        queries.push(Query.equal('subCategories', filters.subCategories));
      }

      if (filters?.brands) {
        queries.push(Query.equal('brands', filters.brands));
      }

      if (filters?.color) {
        queries.push(Query.equal('attributes.colors', filters.color));
      }

      if (filters?.size) {
        queries.push(Query.equal('attributes.size', filters.size));
      }

      const documents = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        queries,
      );

      set({ products: documents });
    } catch (error) {
      console.error('❌ Ошибка при загрузке товаров:', error);
    }
  },
  fetchProductById: async (
    productId: string,
    options?: { expand?: boolean },
  ) => {
    try {
      const queries: string[] = [Query.equal('$id', productId)];

      if (options?.expand) {
        queries.push(
          Query.select([
            '*',
            'brands.*',
            'subCategories.*',
            'attributes.*',
          ]),
        );
      }

      const documents = await fetchDocuments<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        queries,
      );

      set({ product: documents?.[0] ?? null });
    } catch (error) {
      console.error('❌ Ошибка при загрузке товара:', error);
      set({ product: null });
    }
  },

  create: async (
    formState: Omit<IProduct, '$id'>,
  ): Promise<Models.DefaultRow> => {
    try {
      const createdProduct = await createDocument<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        formState as unknown as IProduct,
      );

      return createdProduct;
    } catch (error) {
      console.error('❌ Ошибка при создании товара:', error);
      throw error;
    }
  },

  update: async (
    id: string,
    formState: Partial<Omit<IProduct, '$id'>>,
  ): Promise<void> => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, formState);
      set((state) => ({
        products: state.products.map((product) =>
          product.$id === id ? { ...product, ...formState } : product,
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

  /**
   * Saves product with embedded attributes in a single write.
   */
  upsertWithAttributes: async (input): Promise<string> => {
    const incomingAttributes = input.attributes ?? [];

    const attributesToKeep = incomingAttributes.filter(
      (a) => (a.quantity ?? 0) > 0 || a.colors || a.size || a.$id,
    );

    const embeddedAttributes = attributesToKeep.map((attr) => ({
      quantity: attr.quantity ?? 1,
      colors: attr.colors ?? '',
      size: attr.size ?? '',
    }));

    const productData: Omit<IProduct, '$id'> = {
      name: input.name,
      price: input.price,
      subCategories: input.subCategories ?? '',
      brands: input.brands ?? '',
      desc: input.desc ?? '',
      image: input.image ?? null,
      tags: input.tags ?? [],
      attributes: embeddedAttributes,
    };

    let productId = input.id;
    if (productId) {
      await updateDocument(DATABASE_ID, COLLECTION_ID, productId, productData);
    } else {
      const createdProduct = await createDocument<IProduct>(
        DATABASE_ID,
        COLLECTION_ID,
        productData as IProduct,
      );
      productId = createdProduct.$id;
    }

    if (!productId) {
      throw new Error('Product upsert failed: No ID received!');
    }

    return productId;
  },
}));
