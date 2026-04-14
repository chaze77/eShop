// components/MainBanner/BannerCarousel.tsx
'use client';

import { Carousel } from 'antd';
import BannerSlide from './BannerSlide';
import './MainBanner.css';
import { Banner } from '@/lib/apis/banners';

interface Props {
  banners: Banner[];
}

const BannerCarousel = ({ banners }: Props) => {
  return (
    <Carousel
      arrows
      infinite
      initialSlide={0}
      className='main-banner'
      autoplay
    >
      {banners.map((banner) => (
        <div key={banner.$id}>
          <BannerSlide
            imageDesktop={banner.imageDesktop}
            imageMobile={banner.imageMobile}
            title={banner.title}
            subTitle={banner.subTitle}
            textColor={banner.textColor}
            colorOverlay={banner.colorOverlay}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;
