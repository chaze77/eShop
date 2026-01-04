'use client';

import React, { ReactNode } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './CustomCarousel.scss';

interface CustomCarouselProps {
  children: ReactNode[];
  slidesToShow?: number;
  autoplay?: boolean;
}

const PrevArrow = ({ onClick }: any) => (
  <button
    type='button'
    className='carouselArrow carouselArrow--prev'
    onClick={onClick}
    aria-label='Previous'
  >
    <LeftOutlined />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    type='button'
    className='carouselArrow carouselArrow--next'
    onClick={onClick}
    aria-label='Next'
  >
    <RightOutlined />
  </button>
);

export const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  slidesToShow = 4,
  autoplay = false,
}) => {
  return (
    <div className='customCarousel'>
      <Carousel
        dots
        arrows
        infinite
        draggable
        autoplay={autoplay}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className='customCarousel__slide'
          >
            {child}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
