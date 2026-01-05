import { Models } from 'appwrite';

export interface IDirectory {
  $id: string;
  name: string;
}

export interface ISubCategory extends Models.Document {
  name: string;
  relatedCategory: IDirectory;
}

export interface IAttributes {
  $id?: string;
  quantity: number;
  colors?: IDirectory | string;
  size?: IDirectory | string;
  products?: string;
}

export interface IProduct {
  $id?: string;
  name: string;
  desc?: string;
  price: string;
  brands?: IDirectory | null | string;
  subCategories?: ISubCategory | null | string;
  attributes?: IAttributes[] | string[];
  tags?: IDirectory[] | string[];
  image?: File | string | null;
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

export interface IBlog extends Models.Document {
  image: string;
  title: string;
  content: string;
}
