import { advantagesItems } from '@/app/constants/advantagesItems';
import Title from '../../ui/Title';

export default function About() {
  return (
    <div className='bg-gray-100 p-8 flex flex-col gap-6 lg:flex-row '>
      {/* Description Section */}
      <div className='lg:w-3/5 md:w-full'>
        <div>
          <div className='mb-4'>
            <Title text='О интернет-магазине XWEAR' />
          </div>

          <p className='text-gray-700 mb-4 text-sm md:text-base transition-all'>
            Команда XWEAR предоставляет услугу доставки только оригинальных
            товаров с крупнейшего китайского маркетплейса Poizon, чтобы наши
            клиенты экономили более 40% на каждой покупке.
          </p>
          <p className='text-gray-700 mb-4 text-sm md:text-base transition-all'>
            Работаем без посредников, благодаря чему можем предоставлять лучшую
            цену. Быстрая, бесплатная доставка.
          </p>
          <p className='text-gray-700 text-sm md:text-base transition-all'>
            Сайт, на котором можно будет удобно оформить покупку, не скачивая
            китайское мобильное приложение Poizon, с удобной фильтрацией
            огромного количества товаров, а так же с возможностью сразу увидеть
            окончательную цену товара.
          </p>
        </div>
      </div>

      {/* Advantages Section */}
      <div className='lg:w-2/5 md:w-full flex justify-end'>
        <div className='bg-white p-6 gap-6 flex w-full flex-col md:flex-row md:justify-start lg:w-4/5 lg:flex lg:flex-col'>
          {advantagesItems.map((item) => (
            <div
              key={item.id}
              className='flex flex-row items-start md:flex-col lg:flex-row lg:items-start'
            >
              <div className='mr-4 text-center md:text-left'>{item.icon}</div>
              <div>
                <h4 className='text-sm font-semibold uppercase mb-1'>
                  {item.title}
                </h4>
                <p className='text-gray-600 text-sm'>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
