'use client';
import { Carousel } from 'antd';
import BannerSlide from './BannerSlide';
import { BANNER_DEFAULTS } from '@/constants/banner-info';
import './MainBanner.css';

const Slider = () => {
  return (
    <>
      <Carousel
        arrows
        infinite={true}
        initialSlide={0}
        className='main-banner'
      >
        <div>
          <BannerSlide
            image={BANNER_DEFAULTS.image}
            title={BANNER_DEFAULTS.title}
            text={BANNER_DEFAULTS.text}
          />
        </div>
        <div>1</div>
        <div>2</div>
      </Carousel>
    </>
  );
};

export default Slider;
