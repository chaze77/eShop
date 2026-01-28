'use client';

import { useSearchParams } from 'next/navigation';
import Products from '@/common/components/products/Products';
import ProductList from '@/common/components/products/ProductList';
import { ICategory } from '@/common/types';
import { useAppSelector } from '@/global/store';
import { SkeletonProducts } from '@/common/components/ui/SkeletonProducts/SkeletonProducts';
import AuthRequiredModal from '@/common/components/modals/AuthRequiredModal/AuthRequiredModal';
import useFavorites from '@/common/hooks/useFavorites';

interface HomeClientProps {
  categories: ICategory[];
}

export default function HomeClient({ categories }: HomeClientProps) {
  const { products, status } = useAppSelector((state) => state.products);

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const hasSearch = q.length > 0;

  const { isFavorite, toggleFavorite, openAuthModal, closeAuthModal } =
    useFavorites();

  if (status === 'pending') return <SkeletonProducts />;

  return (
    <>
      {hasSearch ? (
        <ProductList
          items={products}
          className='products-grid'
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <Products
          items={categories}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
      <AuthRequiredModal
        open={openAuthModal}
        onClose={() => closeAuthModal()}
      />
    </>
  );
}
