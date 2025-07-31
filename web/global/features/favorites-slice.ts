import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IProduct } from '@/types';

interface FavoritesState {
  favorites: IProduct[];
}

// Load persisted favorites from localStorage
const loadFavorites = (): IProduct[] => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
};

const initialState: FavoritesState = {
  favorites: loadFavorites(),
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Replace the entire favorites array
    setFavorites: (state, action: PayloadAction<IProduct[]>) => {
      state.favorites = action.payload;
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    // Add a single product to favorites
    addFavorite: (state, action: PayloadAction<IProduct>) => {
      state.favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    // Remove a product by its ID ($id)
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((p) => p.$id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    // Clear all favorites
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('favorites');
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;

// Selector: get the array
export const selectFavorites = (state: RootState) => state.favorites.favorites;

// Selector factory: check if a given ID is in favorites
export const selectIsFavorite = (id: string) =>
  createSelector(selectFavorites, (favorites) =>
    favorites.some((p) => p.$id === id)
  );

export default favoriteSlice.reducer;
