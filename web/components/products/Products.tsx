'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Title from '../ui/Title';
import CustomButton from '../ui/CustomButton';
import ProductCard from './ProductCard';
import './style.css';
import Link from 'next/link';
import { ICategory } from '@/types';

export default function Products({ items }: { items: ICategory[] }) {
  return (
    <div className='mb-10'>
      {items.map((category) => (
        <div
          key={category.$id}
          className='mb-10'
        >
          <div className='flex justify-between p-8'>
            <Title text={category.name} />
            <Link href={`/category/${encodeURIComponent(category.$id)}`}>
              <CustomButton
                action='second'
                text='Больше товаров'
              />
            </Link>
          </div>

          {category.subCategories.length > 0 ? (
            <div className='products-swiper'>
              <Swiper
                direction='horizontal'
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                spaceBetween={10}
                slidesPerView={4}
                keyboard={{ enabled: true }}
              >
                {category.subCategories.map((subCat) =>
                  subCat.products.map((product) => (
                    <SwiperSlide key={product.$id}>
                      <ProductCard
                        product={product}
                        key={product.$id}
                      />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </div>
          ) : (
            <p className='text-gray-500'>Нет товаров в этой категории.</p>
          )}
        </div>
      ))}
    </div>
  );
}
