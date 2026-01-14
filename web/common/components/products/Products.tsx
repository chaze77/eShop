'use client';

import React from 'react';
import Title from '../ui/Title/Title';
import CustomButton from '../ui/CustomButton';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { ICategory } from '@/common/types';
import { CustomCarousel } from '../ui/CustomCarousel/CustomCarousel';
import './Products.scss';

export default function Products({
  items,
  isFavorite,
  onToggleFavorite,
}: {
  items: ICategory[];
  isFavorite: (productId: string) => boolean;
  onToggleFavorite: (productId: string) => void;
}) {
  return (
    <div>
      {items.map((category) => {
        const products =
          category.subCategories?.flatMap((subCat) => subCat.products ?? []) ??
          [];

        if (products.length === 0) {
          return null;
        }

        return (
          <div
            key={category.$id}
            className='products'
          >
            <div className='products-container'>
              <Title text={category.name} />

              <Link href={`/category/${encodeURIComponent(category.$id)}`}>
                <CustomButton
                  action='second'
                  text='Больше товаров'
                />
              </Link>
            </div>

            <div className='products-carousel'>
              <CustomCarousel>
                {products.map((product) => (
                  <div
                    key={product.$id}
                    className='products-carousel__slide'
                  >
                    <ProductCard
                      product={product}
                      isFav={isFavorite(product.$id)}
                      onToggleFavorite={() => onToggleFavorite(product.$id)}
                    />
                  </div>
                ))}
              </CustomCarousel>
            </div>
          </div>
        );
      })}
    </div>
  );
}
