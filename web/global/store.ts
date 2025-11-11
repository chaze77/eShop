import {
  Action,
  configureStore,
  createAsyncThunk,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import categoryReducer from './features/category-slice';
import favoriteReducer from './features/favorites-slice';
import productsReducer from './features/products-slice';
import authReducer from './features/auth-slice';
import cartReducer from './features/cart-slice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    favorites: favoriteReducer,
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
}>();
