'use client';

import { Image } from '@nextui-org/react';
import React, { useEffect, useMemo, useState } from 'react';
import { IDirectory, IProduct } from '@/types';
import Title from '../ui/Title';
import CustomButton from '../ui/CustomButton';
import ProductTabs from './product-tabs/ProductTabs';
import ProductColors from './product-colors/ProductColors';
import ProductSizes from './product-sizes/ProductSizes';
import { useAppDispatch } from '@/global/store';
import { addToCart } from '@/global/features/cart-slice';

interface ProductContentProps {
  product: IProduct;
}

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const dispatch = useAppDispatch();

  const availableColors = Array.from(
    new Map(
      product.attributes.map((a) => a.colors).map((c) => [c?.$id, c])
    ).values()
  );

  const availableSizes = Array.from(
    new Map(
      product.attributes.map((a) => a.size).map((c) => [c?.$id, c])
    ).values()
  );

  if (!product.attributes) null;

  const availableSizeIds = useMemo(() => {
    if (!selectedColor) return [];

    return product.attributes
      .filter((attr) => attr.colors?.$id === selectedColor)
      .map((attr) => attr.size?.$id)
      .filter(Boolean);
  }, [selectedColor]);

  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  const handleSave = () => {
    dispatch(
      addToCart({
        product,
        selectedColor,
        selectedSize,
      })
    );
    console.log('22222');
  };

  return (
    <div>
      <div
        key={product.$id}
        className='flex justify-between p-8'
      >
        <Image
          alt={product.image}
          className='w-full object-cover h-[489px]'
          radius='lg'
          src={product.image}
          width={664}
        />

        <div className='flex flex-col gap-4'>
          <Title text={product.name} />
          <ProductColors
            availableColors={availableColors as IDirectory[]}
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
          />
          {selectedColor && (
            <ProductSizes
              availableSizes={availableSizes as IDirectory[]}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              availableSizeIds={availableSizeIds as string[]}
            />
          )}

          <CustomButton
            text='Добавить в корзину'
            disabled={!selectedColor || !selectedSize}
            onClick={handleSave}
          />
        </div>
      </div>

      <ProductTabs product={product} />
    </div>
  );
};

export default ProductContent;
