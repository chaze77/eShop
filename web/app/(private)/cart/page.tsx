'use client';

import Container from '@/common/components/ui/Container/Container';
import EmptyState from '@/common/components/ui/EmtyState';
import { Flex, Modal, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import {
  deleteCartItem,
  getMyCartItems,
  updateCartItemQty,
} from '@/lib/apis/cart';
import { getProductsByIds } from '@/lib/apis/products';

import type { ICartItem, IProduct } from '@/common/types';

import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { showToast } from '@/helpers/showMessage';
import CartItem from '@/common/components/cart/CartItem';
import CartFooter from '@/common/components/cart/CartFooter';
import { EnrichedCartItem } from '@/common/components/cart/types';
import { ToastTypes } from '@/constants/toastTypes';
import PageShell from '@/common/components/layouts/PageShell';
import { messages } from '@/constants/messages';
import MVPNoticeModal from '@/common/components/modals/MVPModal/MVPModal';
import { useMVPModal } from '@/common/hooks/useShowMVPModal';
import './cart.css';

const { Text } = Typography;

export default function Page() {
  const [items, setItems] = useState<EnrichedCartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { open, openModal, closeModal } = useMVPModal();

  /* ---------------- helpers ---------------- */

  const getPrice = (product?: IProduct) => {
    const p = Number(product?.price);
    return Number.isFinite(p) ? p : 0;
  };

  const formatMoney = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

  /* ---------------- load cart ---------------- */

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const cartItems = (await getMyCartItems()) as ICartItem[];

        if (!cartItems.length) {
          setItems([]);
          return;
        }

        const productIds = Array.from(
          new Set(cartItems.map((c) => c.productId)),
        );

        const products = await getProductsByIds(productIds);

        const enrichedItems = cartItems
          .map((cartItem) => {
            const product = products.find(
              (p: any) => p.$id === cartItem.productId,
            );
            if (!product) return null;

            const attribute = product.attributes?.find(
              (a: any) => a.$id === cartItem.attributeId,
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

  /* ---------------- qty change ---------------- */

  const handleQtyChange = async (cartItemId: string, nextQty: number) => {
    const prev = items;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.$id === cartItemId ? { ...item, qty: nextQty } : item,
      ),
    );

    try {
      setLoading(true);
      await updateCartItemQty(cartItemId, nextQty);
    } catch (e) {
      showToast(ToastTypes.ERROR, messages.cart.updateQty.error);
      setItems(prev);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- remove item ---------------- */

  const handleRemoveItem = async (cartItemId: string) => {
    const prev = items;

    setItems((p) => p.filter((x) => x.$id !== cartItemId));

    try {
      setLoading(true);
      await deleteCartItem(cartItemId);
      showToast(ToastTypes.SUCCESS, messages.cart.remove.success);
    } catch (e) {
      showToast(ToastTypes.ERROR, messages.cart.remove.error);
      setItems(prev);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- total ---------------- */

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + getPrice(item.product) * item.qty;
    }, 0);
  }, [items]);

  /* ---------------- empty / loading ---------------- */

  if (!loading && items.length === 0) {
    return (
      <Container className='cart-page'>
        <EmptyState />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className='cart-page'>
        <LoaderOverlay show />
      </Container>
    );
  }

  /* ---------------- render ---------------- */

  return (
    <PageShell>
      <div className='cart'>
        <Flex
          className='cart__head'
          justify='space-between'
          align='center'
        >
          <Text className='cart__headText'>Элементы</Text>
          <Text className='cart__headText'>Цена / Количество</Text>
        </Flex>

        <div className='cart__body'>
          {items.map((i) => (
            <CartItem
              key={i.$id}
              item={i}
              formatMoney={formatMoney}
              onQtyChange={(nextQty) => handleQtyChange(i.$id, nextQty)}
              onRemove={() => handleRemoveItem(i.$id)}
            />
          ))}
        </div>
      </div>

      {/* footer */}
      <CartFooter
        total={total}
        formatMoney={formatMoney}
        onCheckout={() => openModal()}
      />
      <MVPNoticeModal
        open={open}
        onClose={closeModal}
        text={messages.modal.mvpText}
      />
    </PageShell>
  );
}
