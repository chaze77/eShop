import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import BannerSlide from './BannerSlide';
import './style.css';

export default () => {
  return (
    <Swiper
      direction={'horizontal'}
      pagination={{
        clickable: true,
      }}
      navigation={false} // Включаем стрелки
      modules={[Navigation, Pagination, Autoplay, Keyboard]} // Подключаем модули
      slidesPerView={1}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      keyboard={{
        enabled: true,
      }}
    >
      <SwiperSlide className='relative'>
        <BannerSlide />
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
    </Swiper>
  );
};
