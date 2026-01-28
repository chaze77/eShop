import { appwriteKeys } from '@/appwrite/environment';
import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  updateDocument,
} from './api';
import { Permission, Query, Role } from 'appwrite';

export const addToCartFn = async ({
  productId,
  attributeId,
  userId,
}: {
  productId: string;
  attributeId: string;
  userId: string;
}) => {
  const permissions = [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];

  const existing = await fetchDocuments<any>(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CART_ITEM_ID,
    [
      Query.equal('productId', productId),
      Query.equal('attributeId', attributeId),
      Query.limit(1),
    ],
  );

  const doc = existing?.[0];

  if (doc) {
    const nextQty = (doc.qty ?? 1) + 1;

    await updateDocument(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.CART_ITEM_ID,
      doc.$id,
      { qty: nextQty },
    );

    return { ...doc, qty: nextQty };
  }

  return createDocument(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CART_ITEM_ID,
    { productId, attributeId, qty: 1 },
    permissions,
  );
};

export const getMyCartItems = async (): Promise<any[]> => {
  try {
    const response = await fetchDocuments<any>(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.CART_ITEM_ID,
    );
    return response;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const updateCartItemQty = async (cartItemId: string, qty: number) => {
  await updateDocument(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CART_ITEM_ID,
    cartItemId,
    { qty },
  );
};
export const deleteCartItem = async (cartItemId: string) => {
  await deleteDocument(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CART_ITEM_ID,
    cartItemId,
  );
};
