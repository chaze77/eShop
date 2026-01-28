import React from 'react';
import type { IProduct } from '@/common/types';
import { Row, Col } from 'antd';
import ProductCard from './ProductCard';
import { CustomCarousel } from '../ui/CustomCarousel/CustomCarousel';

type ProductListProps = {
  items: IProduct[];
  layout?: 'grid' | 'carousel';
  columns?: number;
  slidesToShow?: number;
  className?: string;
  itemClassName?: string;
  isFavorite?: (id: string) => boolean;
  onToggleFavorite?: (id: string) => void;
};

export default function ProductList({
  items,
  layout = 'grid',
  columns = 4,
  slidesToShow = 4,
  className,
  itemClassName,
  isFavorite,
  onToggleFavorite,
}: ProductListProps) {
  if (!items || items.length === 0) return null;

  const renderProduct = (product: IProduct) => (
    <ProductCard
      product={product}
      isFav={isFavorite?.(product.$id)}
      onToggleFavorite={
        onToggleFavorite ? () => onToggleFavorite(product.$id) : undefined
      }
    />
  );

  if (layout === 'carousel') {
    return (
      <CustomCarousel slidesToShow={slidesToShow}>
        {items.map((product) => (
          <div
            key={product.$id}
            className={itemClassName}
          >
            {renderProduct(product)}
          </div>
        ))}
      </CustomCarousel>
    );
  }

  return (
    <Row
      className={className}
      gutter={[4, 24]}
    >
      {items.map((product) => (
        <Col
          key={product.$id}
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={8}
          className={itemClassName}
        >
          {renderProduct(product)}
        </Col>
      ))}
    </Row>
  );
}
