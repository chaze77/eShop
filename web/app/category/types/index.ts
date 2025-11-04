export type FilterKey = 'sizes' | 'brands' | 'colors' | 'subCategories';
export type Selected = Record<FilterKey, string[]>;
export type SetFilter = (key: FilterKey, value: string) => void;
