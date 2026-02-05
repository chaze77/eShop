import { IBlog } from '@/types';
import { create } from 'zustand';
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  getDocumentById,
  updateDocument,
} from '@/utils/apiClient/apiClient';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_BLOG_COLLECTION_ID;

interface BlogStore {
  blogs: IBlog[];
  blog: IBlog | null;
  fetchBlogs: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  resetBlog: () => void;
  create: (formState: {
    title: string;
    content: string;
    image: string;
  }) => Promise<void>;
  update: (
    id: string,
    formState: { title: string; content: string; image: string }
  ) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  blog: null,
  fetchBlogs: async () => {
    try {
      const documents = await fetchDocuments<IBlog>(DATABASE_ID, COLLECTION_ID);
      set({ blogs: documents });
    } catch (error) {
      console.error(`Ошибка при загрузке данных из ${COLLECTION_ID}:`, error);
    }
  },
  getById: async (id: string) => {
    try {
      const document = await getDocumentById<IBlog>(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      set({ blog: document });
    } catch (error) {
      console.error('Ошибка при получении блога:', error);
    }
  },
  resetBlog: () => set({ blog: null }),

  create: async (formState: {
    title: string;
    content: string;
    image: string;
  }) => {
    try {
      await createDocument(DATABASE_ID, COLLECTION_ID, { ...formState });
      const documents = await fetchDocuments<IBlog>(DATABASE_ID, COLLECTION_ID);
      set({ blogs: documents });
    } catch (error) {
      console.error('Ошибка при создании блога:', error);
    }
  },

  update: async (
    id: string,
    formState: { title: string; content: string; image: string }
  ) => {
    try {
      await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
      const documents = await fetchDocuments<IBlog>(DATABASE_ID, COLLECTION_ID);
      set({ blogs: documents });
    } catch (error) {
      console.error('Ошибка при обновлении блога:', error);
    }
  },

  delete: async (id: string) => {
    try {
      await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      const documents = await fetchDocuments<IBlog>(DATABASE_ID, COLLECTION_ID);
      set({ blogs: documents });
    } catch (error) {
      console.error('Ошибка при удалении блога:', error);
    }
  },
}));

export default useBlogStore;
