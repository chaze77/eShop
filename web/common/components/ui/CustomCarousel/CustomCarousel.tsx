'use client';

import React, { ReactNode } from 'react';
import { Carousel } from 'antd';
import './CustomCarousel.css';

interface CustomCarouselProps {
  children: ReactNode;
  slidesToShow?: number;
  autoplay?: boolean;
}

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
        autoplay={autoplay}
        slidesToShow={slidesToShow}
        // centerMode
        // centerPadding='30px'
        adaptiveHeight
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 900, settings: { slidesToShow: 2 } },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {slides.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </Carousel>
    </div>
  );
};
