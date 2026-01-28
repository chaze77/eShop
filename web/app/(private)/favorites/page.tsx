'use client';

import EmptyState from '@/common/components/ui/EmtyState';

import PageShell from '@/common/components/layouts/PageShell';
import { useEffect, useState } from 'react';
import { IProduct } from '@/common/types';
import { getProductsByIds } from '@/lib/apis/products';
import FavoriteItems from '@/common/components/favorites/favorite-item/FavoriteItem';
import useFavorites from '@/common/hooks/useFavorites';
import LoaderOverlay from '@/common/components/ui/LoaderOverlay';

export default function Page() {
  const [favoriteProducts, setFavoriteProducts] = useState<IProduct[]>([]);
  const { favorites, removeFavoriteByProductId, isLoading } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      const ids = favorites.map((fav) => fav.productId);
      if (!ids.length) {
        setFavoriteProducts([]);
        return;
      }

      const products = await getProductsByIds(ids);
      setFavoriteProducts(products);
    };

    fetchFavorites();
  }, [favorites]);

  if (isLoading) return <LoaderOverlay show={isLoading} />;

  return (
    <PageShell title='Избранное'>
      {favorites.length > 0 ? (
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
    </PageShell>
  );
}
