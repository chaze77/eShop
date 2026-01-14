'use client';

import EmptyState from '@/common/components/ui/EmtyState';

import PageLayout from '@/common/components/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { deleteFavoriteItem, getFavoritesList } from '@/lib/apis/favorites';
import { IProduct } from '@/common/types';
import { getProductsByIds } from '@/lib/apis/products';
import FavoriteItems from '@/common/components/favorites/favorite-item/FavoriteItem';

export default function Page() {
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavoritesList();
        setFavoriteItems(response);
        const ids = response.map((fav) => fav.productId);
        const products = await getProductsByIds(ids);
        setFavoriteProducts(products);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavoriteByProductId = async (productId: string) => {
    const favDocId = favoriteItems.find((f) => f.productId === productId)?.$id;
    if (!favDocId) return;

    await deleteFavoriteItem(favDocId);

    // обновим локально (без refetch)
    setFavoriteItems((prev) => prev.filter((f) => f.$id !== favDocId));
    setFavoriteProducts((prev) => prev.filter((p) => p.$id !== productId));
  };

  return (
    <PageLayout>
      <h1 className='text-2xl font-bold mb-4'>Избранное</h1>
      {favoriteProducts.length > 0 ? (
        <FavoriteItems
          favorites={favoriteProducts}
          onRemove={removeFavoriteByProductId}
        />
      ) : (
        <EmptyState
          title='Пусто в избранном'
          description='Добавляйте товары в избранное — нажмите на звёздочку на карточке товара.'
        />
      )}
    </PageLayout>
  );
}
