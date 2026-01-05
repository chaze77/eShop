'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Card } from 'antd';
import { useAppDispatch, useAppSelector } from '@/global/store';
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from '@/global/features/favorites-slice';
import { IProduct } from '@/common/types';
import StarIcon from '../icons/StarIcon';
import './ProductCard.scss';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
  const { Meta } = Card;

  return (
    <Card
      className='product-card'
      style={{ width: 300 }}
      size='small'
      cover={
        <img
          draggable={false}
          alt={product.name}
          src={product.image}
          onClick={handleClick}
          className='product-card__img'
        />
      }
      extra={
        <span
          className={`product-card__fav ${isFav ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          <StarIcon filled={isFav ? true : false} />
        </span>
      }
    >
      <Meta
        title={product.name}
        description={<div className='product-card__desc'>{product.price}</div>}
      />
    </Card>
  );
};

export default ProductCard;
