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
  parent_id: string;
}

export interface ISubCategory extends IBaseDocument {
  name: string;
  relatedCategory: ICategory;
}

export interface IDirectory {
  $id: string;
  name: string;
}

export interface IAttributes {
  $id?: string;
  quantity: number;
  colors?: IDirectory | string;
  size?: IDirectory | string;
  products?: string;
}

export interface IProduct extends IBaseDocument {
  name: string;
  desc?: string;
  price: string;
  brands?: IDirectory | null | string;
  subCategories?: ISubCategory;
  attributes?: IAttributes[] | string[];
  tags?: IDirectory[] | string[];
  image?: string;
}
