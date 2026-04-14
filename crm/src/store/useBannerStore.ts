import { create } from 'zustand';

import { IBanner } from '@/types';
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  getDocumentById,
  updateDocument,
} from '@/utils/apiClient/apiClient';
import { Models } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_BANNERS_COLLECTION_ID;

export interface BannerStore {
  banners: IBanner[];
  banner: IBanner | null;
  fetchBanners: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  resetBanner: () => void;
  create: (formState: BannerCreateDto) => Promise<void>;
  update: (id: string, formState: BannerCreateDto) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

type BannerCreateDto = Omit<IBanner, keyof Models.Document>;

const useBannerStore = create<BannerStore>((set) => ({
  banners: [],
  banner: null,
  fetchBanners: async () => {
    try {
      const documents = await fetchDocuments<IBanner>(
        DATABASE_ID,
        COLLECTION_ID,
      );
      set({ banners: documents });
    } catch (error) {
      console.error(`Ошибка при загрузке данных из ${COLLECTION_ID}:`, error);
    }
  },
  getById: async (id: string) => {
    try {
      const document = await getDocumentById<IBanner>(
        DATABASE_ID,
        COLLECTION_ID,
        id,
      );
      set({ banner: document });
    } catch (error) {
      console.error('Ошибка при получении баннера:', error);
    }
  },
  resetBanner: () => set({ banner: null }),

  create: async (payload: BannerCreateDto) => {
    try {
      await createDocument<BannerCreateDto>(
        DATABASE_ID,
        COLLECTION_ID,
        payload,
      );

      const documents = await fetchDocuments<IBanner>(
        DATABASE_ID,
        COLLECTION_ID,
      );

      set({ banners: documents });
    } catch (error) {
      console.error('Ошибка при создании баннера:', error);
    }
  },

  update: async (id: string, formState: BannerCreateDto) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      const documents = await fetchDocuments<IBanner>(
        DATABASE_ID,
        COLLECTION_ID,
      );
      set({ banners: documents });
    } catch (error) {
      console.error('Ошибка при обновлении баннера:', error);
    }
  },
  delete: async (id: string) => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      const documents = await fetchDocuments<IBanner>(
        DATABASE_ID,
        COLLECTION_ID,
      );
      set({ banners: documents });
    } catch (error) {
      console.error('Ошибка при удалении блога:', error);
    }
  },
}));

export default useBannerStore;
