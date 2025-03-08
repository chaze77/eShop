import { Models } from 'appwrite';

// Базовая структура каталога (бренды, цвета, размеры и т. д.)
export interface IDirectory {
  $id: string;
  name: string;
}

// Подкатегории продуктов
export interface ISubCategory extends Models.Document {
  name: string;
  relatedCategory: IDirectory;
}

// Атрибуты продуктов (цвет, размер, количество)
export interface IAttributes {
  $id?: string;
  quantity: number;
  colors?: IDirectory | string;
  size?: IDirectory | string; // Размеры тоже используют IDirectory
  products?: string; // ID связанного продукта
}

// Основной интерфейс продукта
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
