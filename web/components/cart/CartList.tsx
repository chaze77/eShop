"use client";

import CartItemView from './CartItem';
import type { CartItem } from '@/global/features/cart-slice';

export default function CartList({ items }: { items: CartItem[] }) {
  return (
    <div>
      {items.map((it) => (
        <CartItemView key={it.product.$id} item={it} />
      ))}
    </div>
  );
}

