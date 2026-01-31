'use client';

import React, { ReactNode } from 'react';
import { Carousel } from 'antd';

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
        draggable
        centerMode={true}
        centerPadding='2'
        autoplay={autoplay}
        slidesToShow={slidesToShow}
        adaptiveHeight
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1200, settings: { slidesToShow: 3 } },
          { breakpoint: 900, settings: { slidesToShow: 2 } },
          { breakpoint: 600, settings: { slidesToShow: 1 } },
        ]}
      >
        {slides.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </Carousel>
    </div>
  );
};
