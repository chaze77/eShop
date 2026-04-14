import { tablesDB } from '@/appwrite/config';
import { ID } from 'appwrite';

export const fetchDocuments = async <TOutput>(
  databaseId: string,
  tableId: string,
  filters?: string[],
): Promise<TOutput[]> => {
  const response = await tablesDB.listRows({
    databaseId,
    tableId,
    queries: filters,
  });

  return response.rows as TOutput[];
};

export const getDocumentById = async <TOutput>(
  databaseId: string,
  tableId: string,
  rowId: string,
): Promise<TOutput> => {
  const response = await tablesDB.getRow({ databaseId, tableId, rowId });
  return response as TOutput;
};
export const createDocument = async <TInput, TOutput>(
  databaseId: string,
  tableId: string,
  data: TInput,
): Promise<TOutput> => {
  const response = await tablesDB.createRow({
    databaseId,
    tableId,
    rowId: ID.unique(),
    data: data as Record<string, unknown>,
  });
  return response as TOutput;
};

export const updateDocument = async <TInput>(
  databaseId: string,
  tableId: string,
  rowId: string,
  data: Partial<TInput>,
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
