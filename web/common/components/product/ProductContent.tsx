'use client';

import { Image, Tag } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { IDirectory, IProduct } from '@/common/types';
import Title from '../ui/Title/Title';
import CustomButton from '../ui/CustomButton';
import ProductTabs from './product-tabs/ProductTabs';
import ProductColors from './product-colors/ProductColors';
import ProductSizes from './product-sizes/ProductSizes';
import { useAppDispatch } from '@/global/store';
import { addToCartThunk } from '@/global/features/cart-slice';
import './ProductContent.scss';

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

  const selectedAttribute = product.attributes.find(
    (a) => a.colors?.$id === selectedColor && a.size?.$id === selectedSize
  );

  const attributeId = selectedAttribute?.$id ?? '';
  const productId = product.$id;

  console.log(selectedAttribute, 'selectedAttributeId');

  const handleSave = () => {
    dispatch(
      addToCartThunk({
        productId,
        attributeId,
      })
    );
  };

  return (
    <div>
      <div
        key={product.$id}
        className='product-content'
      >
        <Image
          alt={product.image}
          className='product-content__image'
          src={product.image}
          width={664}
          height={489}
          preview={false}
        />

        <div className='product-content__details'>
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
          {selectedColor && selectedSize && (
            <Tag color='error'>{selectedAttribute?.quantity} items to left</Tag>
          )}
          <CustomButton
            text='добавить'
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
