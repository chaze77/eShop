import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '@/common/types';
import { getProductsByName } from '@/lib/apis/products';

export const fetchProductsByName = createAsyncThunk<IProduct[], string>(
  'products/fetchByName',
  async (value) => {
    const products = await getProductsByName(value);
    return products;
  },
);

interface ProductsState {
  products: IProduct[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  searchQuery: string;
}

// Начальное состояние
const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.status = 'idle';
      state.error = null;
      state.searchQuery = '';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByName.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
        state.searchQuery = action.meta.arg; // ← добавить
      })
      .addCase(
        fetchProductsByName.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.status = 'succeeded';
          state.products = action.payload;
        },
      )
      .addCase(fetchProductsByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка запроса';
      });
  },
});
export const { clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
