import { Models } from 'appwrite';

export interface ICategory extends Models.Document {
  name: string;
  subCategories: ISubCategory[];
}

export interface ISubCategory extends Models.Document {
  name: string;
  products: IProduct[];
}

export interface IDirectory extends Models.Document {
  name: string;
}

export interface IAttributes extends Models.Document {
  quantity: number;
  colors?: IDirectory;
  size?: IDirectory;
  products?: IProduct[];
}

export interface IProduct extends Models.Document {
  name: string;
  desc?: string;
  price: string;
  brands?: IDirectory;
  subCategories?: ISubCategory;
  attributes: IAttributes[];
  tags?: IDirectory[] | string[];
  image?: string;
}

export interface ICartItem extends Models.Document {
  productId: string;
  attributeId: string;
}

export interface IFavorite extends Models.Document {
  productId: string;
  userId: string;
}

export interface IBlog extends Models.Document {
  image: string;
  title: string;
  content: string;
}

export interface FavoriteItem {
  $id: string;
  productId: string;
  userId: null;
}

export enum COLORS {
  YELLOW = '#FFD700',
  BLACK = '#121214',
  GRAY = '#B3B3B3',
}

export enum FILTERSTYPE {
  COLORS = 'colors',
  BRANDS = 'brands',
  SIZES = 'sizes',
  SUBCATEGORIES = 'subCategories',
}

export enum BUTTON_TYPE {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
}
