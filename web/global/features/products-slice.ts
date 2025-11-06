import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/types';
import { getProductsByName } from '@/lib/products';

export const fetchProductsByName = createAsyncThunk<IProduct[], string>(
  'products/fetchByName',
  async (value) => {
    const products = await getProductsByName(value);
    return products;
  }
);

interface ProductsState {
  products: IProduct[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.status = 'idle';
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByName.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(
        fetchProductsByName.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.status = 'succeeded';
          state.products = action.payload;
        }
      )
      .addCase(fetchProductsByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка запроса';
      });
  },
});
export const { clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
