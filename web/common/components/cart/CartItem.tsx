'use client';

import { Image, Button, Typography } from 'antd';
import { useAppDispatch } from '@/global/store';
import { removeFromCart, type CartItem } from '@/global/features/cart-slice';
import './CartItem.scss';

const { Text } = Typography;

export default function CartItemView({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  const { product, qty = 1 } = item;

  const price =
    Number(
      String(product.price)
        .replace(/[^0-9.,]/g, '')
        .replace(',', '.')
    ) || 0;

  const lineTotal = price * qty;

  return (
    <div className='cart-item'>
      {/* Image */}
      <div className='cart-item__image'>
        {product.image ? (
          <Image
            alt={product.name}
            src={product.image}
            width={96}
            height={96}
            preview={false}
          />
        ) : (
          <div className='cart-item__placeholder'>Нет изображения</div>
        )}
      </div>

      {/* Info */}
      <div className='cart-item__info'>
        <Text
          strong
          className='cart-item__title'
        >
          {product.name}
        </Text>
        <Text
          type='secondary'
          className='cart-item__price'
        >
          {price.toFixed(2)} ₽
        </Text>
      </div>

      {/* Quantity */}
      <div className='cart-item__qty'>
        <Button
          size='small'
          disabled
        >
          −
        </Button>
        <div className='cart-item__qty-value'>{qty}</div>
        <Button
          size='small'
          disabled
        >
          +
        </Button>
      </div>

      {/* Total */}
      <div className='cart-item__total'>
        <Text strong>{lineTotal.toFixed(2)} ₽</Text>
      </div>

      {/* Actions */}
      <div className='cart-item__actions'>
        <Button
          danger
          type='text'
          onClick={() => dispatch(removeFromCart(product.$id))}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
