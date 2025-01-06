import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import React from 'react';

interface ProductCardProps {
  id: number;
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
  return (
    <div
      key={id}
      className=' p-4 flex  flex-col items-center justify-center cursor-pointer'
    >
      <div className='mb-2 '>
        <Image
          alt={image}
          isZoomed
          className='w-full object-cover h-[140px] '
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
