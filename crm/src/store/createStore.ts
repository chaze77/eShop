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

export function createStore<T>(DATABASE_ID: string, COLLECTION_ID: string) {
  return create<Store<T>>((set) => ({
    items: [],
    item: null,

    fetchItems: async () => {
      try {
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
      } catch (error) {
        console.error(`Ошибка при загрузке данных из ${COLLECTION_ID}:`, error);
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
        console.error(
          `Ошибка при получении документа ${id} из ${COLLECTION_ID}:`,
          error
        );
      }
    },

    resetItem: () => set({ item: null }),

    create: async (formState: Partial<T>) => {
      try {
        await createDocument(DATABASE_ID, COLLECTION_ID, { ...formState });
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
        showMessage('success', 'Successfully created');
      } catch (error) {
        console.error(`Ошибка при создании в ${COLLECTION_ID}:`, error);
        showMessage('error', 'Failed to create');
      }
    },

    update: async (id: string, formState: Partial<T>) => {
      try {
        await updateDocument(DATABASE_ID, COLLECTION_ID, id, { ...formState });
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
        showMessage('success', 'Successfully updated');
      } catch (error) {
        console.error(`Ошибка при обновлении в ${COLLECTION_ID}:`, error);
        showMessage('error', 'Failed to update');
      }
    },

    deleteItem: async (id: string) => {
      try {
        await deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        const documents = await fetchDocuments<T>(DATABASE_ID, COLLECTION_ID);
        set({ items: documents });
        showMessage('success', 'Successfully deleted');
      } catch (error) {
        console.error(`Ошибка при удалении из ${COLLECTION_ID}:`, error);
        showMessage('error', 'Failed to delete');
      }
    },
  }));
}
