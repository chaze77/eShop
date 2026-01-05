'use client';

import Container from '@/common/components/ui/Container/Container';
import CategoryProducts from '@/common/components/products/CategoryProducts';
import EmptyState from '@/common/components/ui/EmtyState';
import { useAppSelector } from '@/global/store';
import { selectFavorites } from '@/global/features/favorites-slice';

export default function Page() {
  const favorites = useAppSelector(selectFavorites);

  return (
    <Container className='max-w-[1500px] w-full p-8'>
      <h1 className='text-2xl font-bold mb-4'>Избранное</h1>
      {favorites.length > 0 ? (
        <CategoryProducts products={favorites} />
      ) : (
        <EmptyState
          title='Пусто в избранном'
          description='Добавляйте товары в избранное — нажмите на звёздочку на карточке товара.'
        />
      )}
    </Container>
  );
}
