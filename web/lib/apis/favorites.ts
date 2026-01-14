import { appwriteKeys } from '@/appwrite/environment';
import { createDocument, deleteDocument, fetchDocuments } from './api';
import { Permission, Role } from 'appwrite';
import { FavoriteItem } from '@/common/types';

export const deleteFavoriteItem = async (id: string) => {
  await deleteDocument(appwriteKeys.DATABASE_ID, appwriteKeys.FAVORITES_ID, id);
};
export const addToFavorites = async ({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) => {
  const permissions = [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];
  const response = await createDocument(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.FAVORITES_ID,
    { productId },
    permissions
  );
  return response;
};

export const getFavoritesList = async (): Promise<FavoriteItem[]> => {
  const response = await fetchDocuments(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.FAVORITES_ID
  );

  return response as FavoriteItem[];
};
