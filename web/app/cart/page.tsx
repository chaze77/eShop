'use client';

import Container from '@/common/components/ui/Container/Container';
import CartList from '@/common/components/cart/CartList';
import EmptyState from '@/common/components/ui/EmtyState';
import { Button, Card, Space, Typography } from 'antd';
import './cart.scss';
import { useEffect, useMemo, useState } from 'react';

import { getMyCartItems } from '@/lib/apis/cart';
import { getProductsByIds } from '@/lib/apis/products';
import type { ICartItem } from '@/common/types';

const { Title, Text } = Typography;

type EnrichedCartItem = ICartItem & {
  product: any;
  attribute: any;
  color?: any;
  size?: any;
  availableQty?: any;
};

export default function Page() {
  const [items, setItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        // 1) cart_items
        const cartItems = (await getMyCartItems()) as ICartItem[];

        if (!cartItems.length) {
          setItems([]);
          return;
        }

        // 2) уникальные productId
        const productIds = Array.from(
          new Set(cartItems.map((c) => c.productId))
        );

        // 3) получаем продукты (внутри уже есть attributes)
        const products = await getProductsByIds(productIds);

        // 4) объединяем cartItem + product + attribute
        const enrichedItems = cartItems
          .map((cartItem) => {
            const product = products.find(
              (p: any) => p.$id === cartItem.productId
            );
            if (!product) return null;

            const attribute = product.attributes?.find(
              (a: any) => a.$id === cartItem.attributeId
            );
            if (!attribute) return null;

            return {
              ...cartItem,
              product,
              color: attribute.colors,
              size: attribute.size,
              availableQty: attribute.quantity,
            } as EnrichedCartItem;
          })
          .filter(Boolean) as EnrichedCartItem[];

        setItems(enrichedItems);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  console.log(items, 'items');

  return (
    <Container className='cart-page'>
      {items.map((i) => (
        <div key={i.$id}>
          <Space align='center'>
            <p>{i.product.name}</p>
            <img
              src={i.product.image}
              style={{ height: '90px', width: '90px' }}
            />
            <p>{i.color.name}</p>
            <p>{i.size.name}</p>
            <p>{i.qty}</p>
          </Space>
        </div>
      ))}
    </Container>
  );
}
