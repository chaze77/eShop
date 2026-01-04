'use client';

import React from 'react';
import Title from '../ui/Title/Title';
import CustomButton from '../ui/CustomButton';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { ICategory } from '@/common/types';
import './Products.scss';
import { CustomCarousel } from '../ui/CustomCarousel/CustomCarousel';

export default function Products({ items }: { items: ICategory[] }) {
  return (
    <div>
      {items.map((category) => {
        const products =
          category.subCategories?.flatMap((subCat) => subCat.products) ?? [];

        return (
          <div
            key={category.$id}
            className='products'
          >
            {products.length > 0 && (
              <div className='products-container'>
                <Title text={category.name} />

                <Link href={`/category/${encodeURIComponent(category.$id)}`}>
                  <CustomButton
                    action='second'
                    text='Больше товаров'
                  />
                </Link>
              </div>
            )}

            <div className='products-carousel'>
              <CustomCarousel>
                {products.map((product) => (
                  <div
                    key={product.$id}
                    className='products-carousel__slide'
                  >
                    <ProductCard product={product} />
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
