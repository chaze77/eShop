import { Models } from 'appwrite';

export interface IDirectory extends Models.Document {
  name: string;
  $id: string;
}

export interface ISubCategory extends Models.Document {
  name: string;
  relatedCategory: IDirectory;
}

export interface Store<T> {
  items: T[];
  item: T | null;
  fetchItems: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  resetItem: () => void;
  create: (formState: Partial<T>) => Promise<void>;
  update: (id: string, formState: Partial<T>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}
