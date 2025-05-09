export interface IBaseDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  subCategories: [];
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

export interface IProduct extends IBaseDocument {
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
