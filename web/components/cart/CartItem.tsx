'use client';

import { Image, Button } from '@nextui-org/react';
import { useAppDispatch } from '@/global/store';
import { removeFromCart, type CartItem } from '@/global/features/cart-slice';

export default function CartItemView({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  const { product } = item;

  const price =
    parseFloat(
      String(product.price)
        .replace(/[^0-9.,]/g, '')
        .replace(',', '.')
    ) || 0;
  const lineTotal = price;

  return (
    <div className='flex gap-4 py-4 border-b border-gray-200 items-center'>
      <div className='w-24 h-24 flex items-center justify-center bg-gray-50 rounded'>
        {product.image ? (
          <Image
            alt={product.name}
            src={product.image}
            radius='md'
            className='object-cover w-24 h-24'
          />
        ) : (
          <div className='text-gray-400'>Нет фото</div>
        )}
      </div>

      <div className='flex-1'>
        <div className='font-medium'>{product.name}</div>
        <div className='text-sm text-gray-500'>{price.toFixed(2)} ₽</div>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          size='sm'
          variant='flat'
          // onPress={() => dispatch(decrementQty(product.$id))}
        >
          −
        </Button>
        <div className='w-8 text-center'>{'qty'}</div>
        <Button
          size='sm'
          variant='flat'
          // onPress={() => dispatch(incrementQty(product.$id))}
        >
          +
        </Button>
      </div>

      <div className='w-24 text-right font-medium'>
        {lineTotal.toFixed(2)} ₽
      </div>

      <div>
        <Button
          size='sm'
          color='danger'
          variant='flat'
          onPress={() => dispatch(removeFromCart(product.$id))}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
}
