'use client';

import { Card, CardBody, Image, Tab, Tabs } from '@nextui-org/react';
import React, { useState } from 'react';
import { IProduct } from '@/types';
import Title from '../ui/Title';
import CustomButton from '../ui/CustomButton';

interface ProductContentProps {
  product: IProduct;
}

const ProductContent: React.FC<ProductContentProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<any | null>(null);

  const availableColors = [
    ...new Set(product.attributes?.map((attr: any) => attr.colors.name)),
  ];

  const filteredSizes = product.attributes?.filter(
    (attr: any) => attr.colors.name === selectedColor
  );

  return (
    <div>
      <div
        key={product.$id}
        className='flex justify-between p-8'
      >
        <Image
          alt={product.image}
          className='w-full object-cover h-[489px]'
          radius='lg'
          src={product.image}
          width={664}
        />

        <div className='flex flex-col w-[500px]'>
          <Title text={product.name} />

          {/* Выбор цвета */}
          <p className='uppercase mb-2'>Цвета:</p>
          <div className='flex gap-2 mb-4'>
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
                className={`w-6 h-6 rounded-full ${
                  selectedColor === color ? 'ring-2 ring-black' : ''
                }`}
                style={{
                  backgroundColor: color,
                }}
                title={color}
              />
            ))}
          </div>

          {/* Размеры */}
          {selectedColor && (
            <>
              <p className='uppercase mb-2'>EU размеры:</p>
              <div className='flex flex-wrap gap-2 mb-6'>
                {filteredSizes?.map((attr: any) => {
                  const isSelected =
                    selectedSize?.size?.name === attr.size.name;
                  return (
                    <button
                      key={attr.size.$id}
                      onClick={() => setSelectedSize(attr)}
                      className={`px-4 py-2 border rounded text-sm text-center
                        ${
                          isSelected
                            ? 'bg-blue font-semibold text-white'
                            : 'hover:bg-gray-100'
                        }`}
                    >
                      <div>{attr.size.name}</div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Выбранные значения и кнопка */}
          <div className='flex gap-4'>
            {(selectedSize || selectedColor) && (
              <div className='flex flex-col items-start gap-2 mb-4'>
                {selectedSize && (
                  <p className='text-lg'>
                    Размер — <strong>{selectedSize.size.name}</strong>
                  </p>
                )}
                {selectedColor && (
                  <p className='text-lg'>
                    Цвет — <strong>{selectedColor}</strong>
                  </p>
                )}
                <p className='text-lg font-semibold'>{product.price} ₽</p>
              </div>
            )}

            <CustomButton text='Добавить в корзину' />
          </div>
        </div>
      </div>

      {/* Таблица с деталями */}
      <div className='flex w-full flex-col'>
        <Tabs
          aria-label='Options'
          variant='underlined'
          classNames={{
            cursor: 'bg-blue',
            tabContent: 'text-black',
          }}
        >
          <Tab
            key='details'
            title='Детали'
          >
            <Card>
              <CardBody>
                <dl className='space-y-2 text-sm text-black'>
                  <div className='flex justify-between border-b border-dotted pb-1'>
                    <dt className='text-gray-500'>Артикул</dt>
                    <dd className='font-medium'>{product?.$id}</dd>
                  </div>
                  <div className='flex justify-between border-b border-dotted pb-1'>
                    <dt className='text-gray-500'>Категория</dt>
                    <dd className='font-medium'>
                      {product.subCategories?.relatedCategory.name}
                    </dd>
                  </div>
                  <div className='flex justify-between border-b border-dotted pb-1'>
                    <dt className='text-gray-500'>Бренд</dt>
                    <dd className='font-medium'>{product?.brands?.name}</dd>
                  </div>
                </dl>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key='delivery'
            title='Доставка'
          >
            <Card>
              <CardBody>В разработке</CardBody>
            </Card>
          </Tab>
          <Tab
            key='payment'
            title='Оплата'
          >
            <Card>
              <CardBody>В разработке</CardBody>
            </Card>
          </Tab>
          <Tab
            key='faq'
            title='FAQ'
          >
            <Card>
              <CardBody>В разработке</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductContent;
