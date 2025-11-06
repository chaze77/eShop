'use client';

import EmptyState from '@/components/common/EmtyState';
import ProductCard from '@/components/products/ProductCard';
import Container from '@/components/ui/Container';
import { useAppSelector } from '@/global/store';

export default function Page() {
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <Container>
      <h1 className='text-2xl font-bold mb-4'>Избранное</h1>
      {favorites.length > 0 ? (
        favorites.map((fav) => (
          <ProductCard
            product={fav}
            key={fav.$id}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </Container>
  );
}
