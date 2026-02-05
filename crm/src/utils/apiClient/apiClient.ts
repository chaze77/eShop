import { tablesDB } from '@/appwrite/config';
import { ID } from 'appwrite';

export const fetchDocuments = async <T>(
  databaseId: string,
  tableId: string,
  filters?: string[],
): Promise<T[]> => {
  const response = await tablesDB.listRows({
    databaseId,
    tableId,
    queries: filters,
  });

  return response.rows as T[];
};

export const getDocumentById = async <T>(
  databaseId: string,
  tableId: string,
  rowId: string,
): Promise<T> => {
  const response = await tablesDB.getRow({ databaseId, tableId, rowId });
  return response as T;
};
export const createDocument = async <T extends object>(
  databaseId: string,
  tableId: string,
  data: T,
) => {
  return tablesDB.createRow({
    databaseId,
    tableId,
    rowId: ID.unique(),
    data: data as Record<string, unknown>,
  });
};

export const updateDocument = async <T extends Record<string, unknown>>(
  databaseId: string,
  tableId: string,
  rowId: string,
  data: Partial<T>,
): Promise<void> => {
  await tablesDB.updateRow({
    databaseId,
    tableId,
    rowId,
    data,
  });
};

export const deleteDocument = async (
  databaseId: string,
  tableId: string,
  rowId: string,
): Promise<void> => {
  await tablesDB.deleteRow({
    databaseId,
    tableId,
    rowId,
  });
};
