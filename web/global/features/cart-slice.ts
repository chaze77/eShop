import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { IProduct } from '@/types';
import type { RootState } from '@/global/store';

export type CartItem = {
  product: IProduct;
  qty: number;
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
    addToCart: (state, action: PayloadAction<{ product: IProduct; qty?: number }>) => {
      const { product, qty = 1 } = action.payload;
      const existing = state.items.find((i) => i.product.$id === product.$id);
      if (existing) {
        existing.qty += qty;
      } else {
        state.items.push({ product, qty });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.product.$id !== action.payload);
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.product.$id === action.payload);
      if (item) item.qty += 1;
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.product.$id === action.payload);
      if (item) item.qty = Math.max(1, item.qty - 1);
    },
    setQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.items.find((i) => i.product.$id === action.payload.id);
      if (item) item.qty = Math.max(1, action.payload.qty);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  setQty,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (s: RootState) => s.cart.items;

function toNumberPrice(p: IProduct): number {
  const n = parseFloat(String(p.price).replace(/[^0-9.,]/g, '').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

export const selectCartTotals = createSelector(selectCartItems, (items) => {
  const subtotal = items.reduce((sum, i) => sum + toNumberPrice(i.product) * i.qty, 0);
  return {
    count: items.reduce((c, i) => c + i.qty, 0),
    subtotal,
    total: subtotal, // taxes/shipping could be added later
  };
});

export default cartSlice.reducer;

