export interface IBaseDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface ICategory extends IBaseDocument {
  name: string;
  subCategories: ISubCategory[];
}

export interface ISubCategory extends IBaseDocument {
  name: string;
  products: IProduct[];
}

export interface IDirectory {
  $id: string;
  name: string;
}

export interface IAttributes {
  $id?: string;
  quantity: number;
  colors?: IDirectory;
  size?: IDirectory;
  products?: string;
}

export interface IProduct extends IBaseDocument {
  name: string;
  desc?: string;
  price: string;
  brands?: IDirectory;
  subCategories?: ISubCategory;
  attributes?: IAttributes[] | string[];
  tags?: IDirectory[] | string[];
  image?: string;
}

export enum FILTERS {
  BRANDS = 'brands',
  COLORS = 'colors',
  SIZES = 'sizes',
  SUB_CATEGORIES = 'subCategories',
}
