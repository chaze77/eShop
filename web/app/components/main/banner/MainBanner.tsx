import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Добавьте этот импорт для стрелок
import './style.css';
import BannerSlide from './BannerSlide';

const Slider = () => {
  return (
    <div className='main-banner'>
      <Swiper
        direction='horizontal'
        pagination={{
          clickable: true, // Точки пагинации кликабельные
        }}
        navigation={false} // Включены стрелки
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        slidesPerView={1} // Один слайд за раз
        // autoplay={{
        //   delay: 5000, // Автопрокрутка каждые 5 секунд
        //   disableOnInteraction: false,
        // }}
        keyboard={{
          enabled: true, // Навигация с клавиатуры
        }}
      >
        <SwiperSlide>
          <BannerSlide />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
