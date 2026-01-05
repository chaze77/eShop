'use client';

import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';
import { setFavorites } from './features/favorites-slice';
import { setCart } from './features/cart-slice';
import type { IProduct } from '@/common/types';
import { fetchCurrentUser } from './features/auth-slice';

function FavoritesPersistence() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem('favorites');
      if (raw) {
        const parsed = JSON.parse(raw) as IProduct[];
        store.dispatch(setFavorites(parsed));
      }
    } catch {}

    const unsubscribe = store.subscribe(() => {
      try {
        const favs = store.getState().favorites.favorites;
        localStorage.setItem('favorites', JSON.stringify(favs));
        const cart = store.getState().cart.items;
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch {}
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Try to restore current session on startup
    store.dispatch(fetchCurrentUser());
    try {
      const rawCart = localStorage.getItem('cart');
      if (rawCart) {
        const parsed = JSON.parse(rawCart);
        store.dispatch(setCart(parsed));
      }
    } catch {}
  }, []);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <FavoritesPersistence />
      {children}
    </Provider>
  );
}
