import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import categoryReducer from './features/category-slice';
import favoriteReducer from './features/favorites-slice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    favorites: favoriteReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
