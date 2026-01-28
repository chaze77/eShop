'use client';

import React from 'react';
import { ICategory } from '@/common/types';
import ProductList from './ProductList';
import SectionHeader from '../ui/SectionHeader/SectionHeader';
import { labels } from '@/constants/labels';
import { PageConfig } from '@/constants/pageConfig';
import './Products.css';

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
            <SectionHeader
              className='products-container'
              title={category.name}
              actionLabel={labels.common.loadMore}
              actionHref={PageConfig.CATEGORY(encodeURIComponent(category.$id))}
            />

            <div className='products-carousel'>
              <ProductList
                items={products}
                layout='carousel'
                itemClassName='products-carousel__slide'
                isFavorite={isFavorite}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
