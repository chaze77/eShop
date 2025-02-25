import { databases } from '@/appwrite/config';
import { ID } from 'appwrite';

export const fetchDocuments = async <T>(
  databaseId: string,
  collectionId: string,
  filters?: string[] // Фильтры как необязательный параметр
): Promise<T[]> => {
  // Передаём фильтры в запрос, если они существуют
  const response = await databases.listDocuments(
    databaseId,
    collectionId,
    filters ? filters : undefined
  );
  return response.documents as T[];
};

export const getDocumentById = async <T>(
  databaseId: string,
  collectionId: string,
  id: string
): Promise<T> => {
  const response = await databases.getDocument(databaseId, collectionId, id);
  return response as T;
};
export const createDocument = async (
  databaseId: string,
  collectionId: string,
  data: Record<string, any>
): Promise<any> => {
  try {
    console.log('📤 Sending data to Appwrite:', JSON.stringify(data, null, 2));
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      data
    );
    console.log('✅ Appwrite response:', response); // 🔥 Логируем ответ
    return response;
  } catch (error) {
    console.error('❌ Error creating document in Appwrite:', error);
    throw error;
  }
};

export const updateDocument = async (
  databaseId: string,
  collectionId: string,
  id: string,
  data: Record<string, any>
): Promise<void> => {
  await databases.updateDocument(databaseId, collectionId, id, data);
};

export const deleteDocument = async (
  databaseId: string,
  collectionId: string,
  id: string
): Promise<void> => {
  await databases.deleteDocument(databaseId, collectionId, id);
};
