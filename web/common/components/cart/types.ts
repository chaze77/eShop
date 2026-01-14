import type { IAttributes, ICartItem, IDirectory, IProduct } from '@/common/types';

export type EnrichedCartItem = ICartItem & {
  product: IProduct;
  attribute: IAttributes | null;
  color?: IDirectory;
  size?: IDirectory;
  availableQty: number;
};
