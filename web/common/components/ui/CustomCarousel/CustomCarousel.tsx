'use client';

import React, { ReactNode } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './CustomCarousel.css';

interface CustomCarouselProps {
  children: ReactNode;
  slidesToShow?: number;
  autoplay?: boolean;
}

const PrevArrow = ({ onClick }: any) => (
  <button
    type='button'
    className='carousel-arrow carousel-arrow-prev'
    onClick={onClick}
    aria-label='Previous'
  >
    <LeftOutlined />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    type='button'
    className='carousel-arrow carousel-arrow-next'
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
  const slides = React.Children.toArray(children);

  return (
    <div className='custom-carousel'>
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
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 900, settings: { slidesToShow: 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1 } },
        ]}
      >
        {slides.map((child, index) => (
          <div
            key={index}
            className='custom-carousel-slide'
          >
            {child}
          </div>
        ))}
      </Carousel>
    </div>
  );
};
