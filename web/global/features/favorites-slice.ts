// global/features/favorites-slice.ts
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { IProduct } from '@/common/types';

interface FavoritesState {
  favorites: IProduct[];
}

const initialState: FavoritesState = { favorites: [] };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<IProduct[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<IProduct>) => {
      if (!state.favorites.some((p) => p.$id === action.payload.$id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((p) => p.$id !== action.payload);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export const selectFavorites = (s: RootState) => s.favorites.favorites;
export const selectIsFavorite = (id: string) =>
  createSelector(selectFavorites, (favs) => favs.some((p) => p.$id === id));

export default favoritesSlice.reducer;
