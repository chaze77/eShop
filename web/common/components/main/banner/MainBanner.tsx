'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation'; // Добавьте этот импорт для стрелок
// import './style.css';
import { Carousel } from 'antd';
import BannerSlide from './BannerSlide';

import './MainBanner.scss';

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
          <BannerSlide />
        </div>
        <div>1</div>
        <div>2</div>
      </Carousel>
    </>
  );
};

export default Slider;
