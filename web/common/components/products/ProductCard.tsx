'use client';

import { useRouter } from 'next/navigation';
import { Card } from 'antd';
import { IProduct } from '@/common/types';
import StarIcon from '../icons/StarIcon';
import './ProductCard.scss';
import { PageConfig } from '@/constants/pageConfig';

interface ProductCardProps {
  product: IProduct;
  isFav?: boolean;
  onToggleFavorite?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFav = false,
  onToggleFavorite,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(PageConfig.PRODUCT(product.$id));
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('click star', {
      hasHandler: typeof onToggleFavorite,
      productId: product.$id,
    });

    onToggleFavorite?.();
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
          onClick={handleToggleFavorite}
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
