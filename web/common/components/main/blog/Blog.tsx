'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, Space } from 'antd';
import CustomButton from '../../ui/CustomButton';
import Title from '../../ui/Title/Title';
import CardBlog from './components/CardBlog';
import { getBlogs } from '@/lib/apis/blogs';
import { IBlog } from '@/common/types';
import './Blog.scss';

export default function Blog() {
  const [blogs, setBlogs] = useState<IBlog[] | null>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className='blog'>
      <div className='blog__header'>
        <Title text='Наш блог' />
      </div>

      <Carousel
        dots
        arrows
        infinite
        autoplay
        slidesToShow={3}
      >
        {blogs?.map((item) => (
          <CardBlog
            key={item.$id}
            id={item.$id}
            img={item.image}
            title={item.title}
            text={item.content}
          />
        ))}
      </Carousel>
    </div>
  );
}
