import { create } from 'zustand';
import {
  fetchDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
} from '@/utils/apiClient/apiClient';
import showMessage from '@/utils/showMessage/showMessage';
import { Store } from '@/types';
import { MESSAGES } from '@/contstants/messages';

export function createStore<T>(DATABASE_ID: string, COLLECTION_ID: string) {
  return create<Store<T>>((set) => ({
    items: [],
    item: null,

    fetchItems: async () => {
      try {
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
      } catch (error) {
        console.error(MESSAGES.toast.loadFail, error);
      }
    },

    getById: async (id: string) => {
      try {
        const document = await getDocumentById<T>(
          DATABASE_ID,
          COLLECTION_ID,
          id
        );
        set({ item: document });
      } catch (error) {
        console.error(MESSAGES.toast.loadFail, error);
      }
    },

    resetItem: () => set({ item: null }),

    create: async (formState: Partial<T>) => {
      try {
        await createDocument(DATABASE_ID, COLLECTION_ID, { ...formState });
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
        showMessage('success', MESSAGES.toast.createSuccess);
      } catch (error) {
        console.error(MESSAGES.toast.createFail, error);
        showMessage('error', MESSAGES.toast.createFail);
      }
    },

    update: async (id: string, formState: Partial<T>) => {
      try {
        await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
        showMessage('success', MESSAGES.toast.updateSuccess);
      } catch (error) {
        console.error(MESSAGES.toast.updateFail, error);
        showMessage('error', MESSAGES.toast.updateFail);
      }
    },

    deleteItem: async (id: string) => {
      try {
        await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
        showMessage('success', MESSAGES.toast.deleteSuccess);
      } catch (error) {
        console.error(MESSAGES.toast.deleteFail, error);
        showMessage('error', MESSAGES.toast.deleteFail);
      }
    },
  }));
}