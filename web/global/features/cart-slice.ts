import { addToCartFn } from '@/lib/apis/cart';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';

export type CartItem = {
  productId: string;
  attributeId: string;
};

interface CartState {
  items: CartItem[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const addToCartThunk = createAsyncThunk<
  any,
  { productId: string; attributeId: string },
  { state: any }
>('cart/createCart', async ({ productId, attributeId }, { getState }) => {
  const userId = getState().auth.user.$id;

  return addToCartFn({
    productId,
    attributeId,
    userId,
  });
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, attributeId } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId && item.attributeId === attributeId)
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to add to cart';
      });
  },
});

export const { setCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
