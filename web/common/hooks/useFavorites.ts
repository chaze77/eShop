'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/global/store';
import {
  addToFavorites,
  deleteFavoriteItem,
  getFavoritesList,
} from '@/lib/apis/favorites';
import type { FavoriteItem } from '@/common/types';

type UseFavoritesResult = {
  favorites: FavoriteItem[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => Promise<void>;
  removeFavoriteByProductId: (productId: string) => Promise<boolean>;
  refresh: () => Promise<void>;
  openAuthModal: boolean;
  closeAuthModal: () => void;
  isLoading: boolean;
};

export default function useFavorites(): UseFavoritesResult {
  const user = useAppSelector((state) => state.auth.user);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await getFavoritesList();
      setFavorites(response ?? []);
    } catch {
      setFavorites([]);
    } finally {
      setIsloading(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.$id) {
      setFavorites([]);
      return;
    }
    refresh();
  }, [user?.$id, refresh]);

  const isFavorite = useCallback(
    (productId: string) => favorites.some((f) => f.productId === productId),
    [favorites],
  );

  const getFavoriteDocIdByProductId = useCallback(
    (productId: string) =>
      favorites.find((f) => f.productId === productId)?.$id,
    [favorites],
  );

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (!user?.$id) {
        setOpenAuthModal(true);
        return;
      }

      const favoriteDocId = getFavoriteDocIdByProductId(productId);

      if (favoriteDocId) {
        await deleteFavoriteItem(favoriteDocId);
      } else {
        await addToFavorites({ productId, userId: user.$id });
      }

      await refresh();
    },
    [getFavoriteDocIdByProductId, refresh, user?.$id],
  );

  const removeFavoriteByProductId = useCallback(
    async (productId: string) => {
      const favoriteDocId = getFavoriteDocIdByProductId(productId);
      if (!favoriteDocId) return false;

      try {
        await deleteFavoriteItem(favoriteDocId);
        setFavorites((prev) => prev.filter((f) => f.$id !== favoriteDocId));
        return true;
      } catch {
        return false;
      }
    },
    [getFavoriteDocIdByProductId],
  );

  const closeAuthModal = useCallback(() => {
    setOpenAuthModal(false);
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavoriteByProductId,
    refresh,
    openAuthModal,
    closeAuthModal,
    isLoading,
  };
}
