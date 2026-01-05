'use client';

import React from 'react';
import { Carousel, Space } from 'antd';
import CustomButton from '../../ui/CustomButton';
import Title from '../../ui/Title/Title';
import CardBlog from './components/CardBlog';
import { blogItems } from '@/constants/blogItems';
import './Blog.scss';

export default function Blog() {
  return (
    <div className='blog'>
      <div className='blog__header'>
        <Title text='Наш блог' />
        <CustomButton
          action='second'
          text='Больше статей'
        />
      </div>

      <Carousel
        dots
        arrows
        infinite
        autoplay
        slidesToShow={3}
      >
        {/* <Space
          size='middle'
          orientation='horizontal'
        > */}
        {blogItems.map((item) => (
          <CardBlog
            key={item.id}
            img={item.img}
            title={item.title}
            text={item.text}
          />
        ))}
        {/* </Space> */}
      </Carousel>
    </div>
  );
}
