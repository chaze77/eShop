'use client';

import { useSearchParams } from 'next/navigation';
import Products from '@/common/components/products/Products';
import ProductCard from '@/common/components/products/ProductCard';
import { ICategory } from '@/common/types';
import { useAppSelector } from '@/global/store';
import { SkeletonProducts } from '@/common/components/ui/SkeletonProducts/SkeletonProducts';
import { useEffect, useState } from 'react';
import {
  addToFavorites,
  deleteFavoriteItem,
  getFavoritesList,
} from '@/lib/apis/favorites';
import AuthRequiredModal from '@/common/components/ui/AuthRequiredModal/AuthRequiredModal';

type FavoriteItem = { $id: string; productId: string };

interface HomeClientProps {
  categories: ICategory[];
}

export default function HomeClient({ categories }: HomeClientProps) {
  const { products, status } = useAppSelector((state) => state.products);
  const user = useAppSelector((state) => state.auth.user);

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const hasSearch = q.length > 0 || (products && products.length > 0);

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const loadFavorites = async () => {
    try {
      const response = await getFavoritesList();
      setFavorites((response ?? []) as FavoriteItem[]);
    } catch {
      setFavorites([]);
    }
  };

  useEffect(() => {
    if (!user?.$id) {
      setFavorites([]);

      return;
    }

    loadFavorites();
  }, [user?.$id]);

  const isFavorite = (productId: string) =>
    favorites.some((f) => f.productId === productId);

  const getFavoriteDocIdByProductId = (productId: string) =>
    favorites.find((f) => f.productId === productId)?.$id;

  const toggleFavorite = async (productId: string) => {
    if (!user?.$id) {
      setOpenModal(true);
      return;
    }

    const favoriteDocId = getFavoriteDocIdByProductId(productId);

    try {
      if (favoriteDocId) {
        await deleteFavoriteItem(favoriteDocId);
      } else {
        await addToFavorites({ productId, userId: user.$id });
      }

      await loadFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  if (status === 'pending') return <SkeletonProducts />;

  return (
    <>
      {hasSearch ? (
        <div className='products-grid'>
          {products.map((p) => (
            <ProductCard
              key={p.$id}
              product={p}
              isFav={isFavorite(p.$id)}
              onToggleFavorite={() => toggleFavorite(p.$id)}
            />
          ))}
        </div>
      ) : (
        <Products
          items={categories}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
      <AuthRequiredModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
