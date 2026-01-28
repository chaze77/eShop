'use client';

import { Image, Tag } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { BUTTON_TYPE, IDirectory, IProduct } from '@/common/types';
import Title from '../ui/Title/Title';
import CustomButton from '../ui/CustomButton';
import ProductTabs from './product-tabs/ProductTabs';
import ProductColors from './product-colors/ProductColors';
import ProductSizes from './product-sizes/ProductSizes';
import { useAppSelector } from '@/global/store';
import { showToast } from '@/helpers/showMessage';
import { useRouter } from 'next/navigation';
import { PageConfig } from '@/constants/pageConfig';
import { addToCartFn } from '@/lib/apis/cart';
import AuthRequiredModal from '../modals/AuthRequiredModal/AuthRequiredModal';
import { ToastTypes } from '@/constants/toastTypes';
import { messages } from '@/constants/messages';
import './ProductContent.css';
import { labels } from '@/constants/labels';

interface ProductContentProps {
  product: IProduct;
}

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const isAuthinticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  const availableColors = Array.from(
    new Map(
      product.attributes.map((a) => a.colors).map((c) => [c?.$id, c]),
    ).values(),
  );

  const availableSizes = Array.from(
    new Map(
      product.attributes.map((a) => a.size).map((c) => [c?.$id, c]),
    ).values(),
  );

  if (!product.attributes) null;

  const availableSizeIds = useMemo(() => {
    if (!selectedColor) return [];

    return product.attributes
      .filter((attr) => attr.colors?.$id === selectedColor)
      .map((attr) => attr.size?.$id)
      .filter(Boolean);
  }, [selectedColor]);

  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  const selectedAttribute = product.attributes.find(
    (a) => a.colors?.$id === selectedColor && a.size?.$id === selectedSize,
  );

  const attributeId = selectedAttribute?.$id ?? '';
  const productId = product.$id;

  const handleSave = async () => {
    if (!isAuthinticated) {
      setOpenModal(true);
      return;
    } else {
      try {
        await addToCartFn({
          productId: productId,
          attributeId: attributeId,
          userId: user?.$id || '',
        });

        showToast(ToastTypes.SUCCESS, messages.cart.add.success);
        router.push(PageConfig.CART);
      } catch (e) {
        showToast(ToastTypes.ERROR, messages.cart.add.error);
        console.error(e);
      }
    }
  };

  return (
    <div>
      <div
        key={product.$id}
        className='product-content'
      >
        <Image
          alt={product.image}
          className='product-content__image'
          src={product.image}
          width={664}
          height={489}
          preview={false}
        />

        <div className='product-content__details'>
          <Title text={product.name} />
          <ProductColors
            availableColors={availableColors as IDirectory[]}
            setSelectedColor={setSelectedColor}
            selectedColor={selectedColor}
          />
          {selectedColor && (
            <ProductSizes
              availableSizes={availableSizes as IDirectory[]}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              availableSizeIds={availableSizeIds as string[]}
            />
          )}
          {selectedColor && selectedSize && (
            <Tag color='error'>{selectedAttribute?.quantity} items to left</Tag>
          )}
          <CustomButton
            variant={BUTTON_TYPE.FIRST}
            text={labels.common.add}
            disabled={!selectedColor || !selectedSize}
            onClick={() => handleSave()}
          />
        </div>
      </div>

      <ProductTabs product={product} />
      <AuthRequiredModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default ProductContent;
