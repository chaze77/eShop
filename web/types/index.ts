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
