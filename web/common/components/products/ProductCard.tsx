'use client';
import Link from 'next/link';
import { Card } from 'antd';
import { COLORS, IProduct } from '@/common/types';
import { PageConfig } from '@/constants/pageConfig';
import { StarFilled } from '@ant-design/icons';
import './ProductCard.css';

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
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    onToggleFavorite?.();
  };

  const { Meta } = Card;

  return (
    <Card
      className='product-card'
      style={{ width: 318 }}
      size='small'
      cover={
        <Link href={PageConfig.PRODUCT(product.$id)}>
          <img
            draggable={false}
            alt={product.name}
            src={product.image}
            className='product-card-img'
          />
        </Link>
      }
      extra={
        <span onClick={handleToggleFavorite}>
          <StarFilled
            style={{ color: isFav ? COLORS.YELLOW : COLORS.GRAY, fontSize: 20 }}
          />
        </span>
      }
    >
      <Meta
        title={product.name}
        description={
          <div>
            <p>{product.price} сом</p>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;
