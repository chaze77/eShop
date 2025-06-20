'use client'; // обязательно в компоненте, если используешь useRouter

import { useRouter } from 'next/navigation';
import { Image } from '@nextui-org/react';
import React from 'react';
import { HeartIcon } from '../icons/HeartIcon';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      key={id}
      onClick={handleClick}
      className='p-4 relative flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition'
    >
      {/* ❤️ Иконка избранного */}
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='absolute top-3 right-3 z-10'
        aria-label='Добавить в избранное'
      >
        <HeartIcon
          size={24}
          strokeWidth={1.5}
          fill={'none'}
          className={`transition ${
            true ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
        />
      </button>

      <div className='mb-2'>
        <Image
          alt={image}
          isZoomed
          className='w-full object-cover h-[240px]'
          radius='lg'
          src={image}
          width={250}
        />
      </div>

      <div className='text-small flex gap-8'>
        <b>{name}</b>
        <p className='text-default-500'>{price} сом</p>
      </div>
    </div>
  );
};

export default ProductCard;
