'use client';

import { useSearchParams } from 'next/navigation';
import Products from '@/components/products/Products';
import ProductCard from '@/components/products/ProductCard';
import { ICategory } from '@/types';
import { useAppSelector } from '@/global/store';

interface HomeClientProps {
  categories: ICategory[];
}

export default function HomeClient({ categories }: HomeClientProps) {
  const { products, status } = useAppSelector((state) => state.products);
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const hasSearch = q.length > 0 || (products && products.length > 0);

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
