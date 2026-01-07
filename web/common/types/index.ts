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
  $id: string;
  name: string;
}

export interface IAttributes extends Models.Document {
  $id: string;
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

export interface IBlog extends Models.Document {
  image: string;
  title: string;
  content: string;
}
