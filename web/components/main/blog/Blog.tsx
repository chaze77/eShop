'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import CustomButton from '../../ui/CustomButton';
import Title from '../../ui/Title';
import CardBlog from './CardBlog';
import { blogItems } from '@/constants/blogItems';

export default function Blog() {
  return (
    <div className='flex flex-col p-8'>
      {/* Заголовок и кнопка */}
      <div className='flex justify-between'>
        <Title text='Наш блог' />
        <CustomButton
          action='second'
          text='Больше статей'
        />
      </div>

      <div className='blog-swiper'>
        <Swiper
          direction='horizontal'
          pagination={{
            clickable: true,
          }}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          keyboard={{
            enabled: true,
          }}
          breakpoints={{
            // На экранах меньше 640px (sm)
            640: {
              slidesPerView: 1,
              slideToClickedSlide: true,
            },
            // На экранах от 768px (md)
            768: {
              slidesPerView: 2,
              slideToClickedSlide: true,
            },
            // На экранах от 1024px (lg)
            1024: {
              slidesPerView: 3,
              slideToClickedSlide: true,
            },
          }}
        >
          {blogItems.map((item) => (
            <SwiperSlide key={item.id}>
              <CardBlog
                img={item.img}
                title={item.title}
                text={item.text}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
