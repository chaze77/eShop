import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { IProduct } from '@/types';
import type { RootState } from '@/global/store';

export type CartItem = {
  product: IProduct;
  selectedColor: string;
  selectedSize: string;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    addToCart: (
      state,
      action: PayloadAction<{
        product: IProduct;
        selectedColor: string;
        selectedSize: string;
      }>
    ) => {
      const { product, selectedColor, selectedSize } = action.payload;

      const exists = state.items.some(
        (i) =>
          i.product.$id === product.$id &&
          i.selectedColor === selectedColor &&
          i.selectedSize === selectedSize
      );

      if (!exists) {
        state.items.push({ product, selectedColor, selectedSize });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedColor: string;
        selectedSize: string;
      }>
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(
            i.product.$id === action.payload.productId &&
            i.selectedColor === action.payload.selectedColor &&
            i.selectedSize === action.payload.selectedSize
          )
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
