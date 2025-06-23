'use client';

import { useRouter } from 'next/navigation';
import { Image } from '@nextui-org/react';
import React from 'react';
import { HeartIcon } from '../icons/HeartIcon';
import { useAppDispatch, useAppSelector } from '@/global/store';
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from '@/global/features/favorites-slice';
import { IProduct } from '@/types';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // получаем, есть ли этот продукт в избранном
  const isFav = useAppSelector(selectIsFavorite(product.$id));

  const handleClick = () => {
    router.push(`/product/${product.$id}`);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFav) {
      dispatch(removeFavorite(product.$id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <div
      onClick={handleClick}
      className='p-4 relative flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition'
    >
      <button
        onClick={toggleFavorite}
        className='absolute top-3 right-3 z-10'
        aria-label={isFav ? 'Убрать из избранного' : 'Добавить в избранное'}
      >
        <HeartIcon
          size={24}
          strokeWidth={1.5}
          fill={isFav ? 'red' : 'none'}
          className={`transition ${
            isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </button>

      <div className='mb-2'>
        <Image
          alt={product.$id}
          isZoomed
          className='w-full object-cover h-[240px]'
          radius='lg'
          src={product.image}
          width={250}
        />
      </div>

      <div className='text-small flex gap-8'>
        <b>{product.name}</b>

        <p className='text-default-500'>{product.price} сом</p>
      </div>
    </div>
  );
};

export default ProductCard;
