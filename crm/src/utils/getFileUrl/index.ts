import { storage } from '@/appwrite/config';
import { ID } from 'appwrite';

const bucketId = import.meta.env.VITE_STORAGE_ID;
const endpoint = import.meta.env.VITE_ENDPOINT;
const projectId = import.meta.env.VITE_PROJECT_ID;

export const getFileUrl = (fileId: string): string => {
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};

export const imageUpload = async (
  file: File
  // oldFileId?: string
): Promise<string> => {
  try {
    //   if (oldFileId) {
    //     await deleteFile(oldFileId);
    //   }

    const response = await storage.createFile(bucketId, ID.unique(), file);

    return response.$id;
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    throw new Error('Failed to upload image');
  }
};
