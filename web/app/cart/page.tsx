"use client";

import Container from '@/components/ui/Container';
import CartList from '@/components/cart/CartList';
import EmptyState from '@/components/common/EmtyState';
import { useAppSelector } from '@/global/store';
import { selectCartItems, selectCartTotals } from '@/global/features/cart-slice';
import { Button, Card, CardBody } from '@nextui-org/react';

export default function Page() {
  const items = useAppSelector(selectCartItems);
  const totals = useAppSelector(selectCartTotals);

  return (
    <Container className="max-w-[1100px] w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>
      {items.length === 0 ? (
        <EmptyState title="Корзина пуста" description="Добавляйте товары в корзину на страницах каталога и товара." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CartList items={items} />
          </div>
          <div>
            <Card>
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Товары</span>
                  <span className="font-medium">{totals.count}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Сумма</span>
                  <span className="font-semibold">{totals.subtotal.toFixed(2)} ₽</span>
                </div>
                <Button color="primary" className="w-full" isDisabled>
                  Оформить заказ
                </Button>
                <p className="text-xs text-gray-400 mt-2">Оформление будет добавлено позже.</p>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
}

