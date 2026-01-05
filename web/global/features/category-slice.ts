import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ICategory } from '@/common/types';

interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export const selectCategories = (state: RootState) =>
  state.categories.categories;
export default categorySlice.reducer;
