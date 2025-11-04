'use client';

import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';
import { setFavorites } from './features/favorites-slice';
import type { IProduct } from '@/types';

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
      } catch {}
    });

    return unsubscribe;
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
