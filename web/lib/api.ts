import { databases } from '@/appwrite/config';
import { emitter } from '@/global/events/event-bus';
import { ID } from 'appwrite';

export const fetchDocuments = async <T>(
  databaseId: string,
  collectionId: string,
  filters?: string[]
): Promise<T[]> => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      filters ? filters : undefined
    );
    return response.documents as T[];
  } catch (e) {
    console.warn('[fetchDocuments] network/error fallback -> []', e);
    emitter.emit(
      'app:error',
      'Не удалось загрузить данные. Проверьте интернет-соединение.'
    );
    return [] as T[];
  }
};

export const getDocumentById = async <T>(
  databaseId: string,
  collectionId: string,
  id: string
): Promise<T> => {
  try {
    const response = await databases.getDocument(databaseId, collectionId, id);
    return response as T;
  } catch (e) {
    console.warn('[getDocumentById] network/error fallback -> null', e);
    emitter.emit(
      'app:error',
      'Не удалось загрузить данные. Проверьте интернет-соединение.'
    );
    return null as unknown as T;
  }
};

export const createDocument = async (
  databaseId: string,
  collectionId: string,
  data: Record<string, any>
): Promise<void> => {
  try {
    await databases.createDocument(databaseId, collectionId, ID.unique(), data);
  } catch (e) {
    console.error('[createDocument] error', e);
    emitter.emit(
      'app:error',
      'Не удалось загрузить данные. Проверьте интернет-соединение.'
    );
  }
};

export const updateDocument = async (
  databaseId: string,
  collectionId: string,
  id: string,
  data: Record<string, any>
): Promise<void> => {
  try {
    await databases.updateDocument(databaseId, collectionId, id, data);
  } catch (e) {
    console.error('[updateDocument] error', e);
    emitter.emit(
      'app:error',
      'Не удалось загрузить данные. Проверьте интернет-соединение.'
    );
  }
};

export const deleteDocument = async (
  databaseId: string,
  collectionId: string,
  id: string
): Promise<void> => {
  try {
    await databases.deleteDocument(databaseId, collectionId, id);
  } catch (e) {
    console.error('[deleteDocument] error', e);
    emitter.emit(
      'app:error',
      'Не удалось загрузить данные. Проверьте интернет-соединение.'
    );
  }
};
