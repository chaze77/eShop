'use client';

import { Carousel } from 'antd';
import BannerSlide from './BannerSlide';
import { BANNERS } from '@/constants/banner-info';
import './MainBanner.css';

const Slider = () => {
  return (
    <Carousel
      arrows
      infinite
      initialSlide={0}
      className='main-banner'
      autoplay
    >
      {BANNERS.map((banner, index) => (
        <div key={index}>
          <BannerSlide
            image={banner.image}
            title={banner.title}
            text={banner.text}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
