'use client';

import { EnrichedCartItem } from './types';
import QuantityButtons from './QuantityButtons';
import { Button, Divider, Flex, Image, Typography } from 'antd';

const { Text } = Typography;

interface CartItemProps {
  item: EnrichedCartItem;
  formatMoney: (n: number) => string;
  onQtyChange: (nextQty: number) => void;
  onRemove: () => void;
}

const getPrice = (price?: string | number) => {
  const p = Number(price);
  return Number.isFinite(p) ? p : 0;
};

const CartItem = ({
  item,
  formatMoney,
  onQtyChange,
  onRemove,
}: CartItemProps) => {
  const unitPrice = getPrice(item.product?.price);
  const rowTotal = unitPrice * item.qty;

  return (
    <div className='cartItem'>
      <Flex
        justify='space-between'
        align='flex-start'
        gap={16}
      >
        {/* left */}
        <Flex
          gap={16}
          align='flex-start'
          className='cartItem__left'
        >
          <div className='cartItem__imgBox'>
            <Image
              src={item.product.image}
              alt={item.product.name}
              width={90}
              height={90}
              preview={false}
            />
          </div>

          <div className='cartItem__info'>
            <div className='cartItem__brand'>
              {item.product.brand?.name ?? item.product.brand ?? ''}
            </div>

            <div className='cartItem__name'>{item.product.name}</div>

            <div className='cartItem__meta'>
              <div>
                <Text strong>Color:</Text>{' '}
                <span>{item.color?.name ?? '-'}</span>
              </div>
              <div>
                <Text strong>Size:</Text> <span>{item.size?.name ?? '-'}</span>
              </div>
            </div>

            <Button
              type='link'
              className='cartItem__link'
              onClick={onRemove}
            >
              Удалить
            </Button>
          </div>
        </Flex>

        {/* right */}
        <div className='cartItem__right'>
          <div className='cartItem__price'>
            <Text className='cartItem__priceNow'>
              {formatMoney(unitPrice)} сом
            </Text>
            <Text
              type='secondary'
              className='cartItem__priceSub'
            >
              {formatMoney(rowTotal)} сом
            </Text>
          </div>

          <QuantityButtons
            value={item.qty}
            availableQty={item.availableQty}
            onChange={onQtyChange}
          />

          {!!item.availableQty && item.availableQty <= 3 && (
            <div className='cartItem__stock'>
              <Text type='danger'>{item.availableQty} left</Text>
            </div>
          )}
        </div>
      </Flex>

      <Divider className='cartItem__divider' />
    </div>
  );
};

export default CartItem;
