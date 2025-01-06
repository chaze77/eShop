import { shoes } from '@/app/constants/products';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Title from '../ui/Title';
import CustomButton from '../ui/CustomButton';
import './style.css';

const Products = () => {
  return (
    <div className='mb-10'>
      <div className='flex justify-between p-8'>
        <Title text='Обувь' />
        <CustomButton
          action='second'
          text='Больше товаров'
        />
      </div>
      <div className='products-swiper'>
        <Swiper
          direction={'horizontal'}
          pagination={{
            clickable: true,
          }}
          navigation={true} // Отключаем стрелки
          modules={[Navigation, Pagination, Autoplay, Keyboard]}
          spaceBetween={10} // Подключаем модули
          slidesPerView={4} // Количество отображаемых слайдов
          keyboard={{
            enabled: true,
          }}
        >
          {shoes.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Products;
