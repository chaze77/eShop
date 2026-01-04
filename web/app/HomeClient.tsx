'use client';

import { useSearchParams } from 'next/navigation';
import Products from '@/common/components/products/Products';
import ProductCard from '@/common/components/products/ProductCard';
import { ICategory } from '@/common/types';
import { useAppSelector } from '@/global/store';
import { log } from 'console';
import { SkeletonProducts } from '@/common/components/ui/SkeletonProducts/SkeletonProducts';

interface HomeClientProps {
  categories: ICategory[];
}

export default function HomeClient({ categories }: HomeClientProps) {
  const { products, status } = useAppSelector((state) => state.products);
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const hasSearch = q.length > 0 || (products && products.length > 0);

  if (status === 'pending') return <SkeletonProducts />;

  console.log(hasSearch, 'hasSearch');

  return (
    <>
      {hasSearch ? (
        <div className='grid grid-cols-4 gap-4 px-8'>
          {products.map((p) => (
            <ProductCard
              key={p.$id}
              product={p}
            />
          ))}
        </div>
      ) : (
        <Products items={categories} />
      )}
    </>
  );
}
