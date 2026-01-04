import { advantagesItems } from '@/constants/advantagesItems';
import Title from '../../ui/Title/Title';
import './About.scss';

export default function About() {
  return (
    <div className='about'>
      {/* Description Section */}
      <div className='about__description'>
        <div className='about__title'>
          <Title text='О интернет-магазине XWEAR' />
        </div>

        <p className='about__text'>
          Команда XWEAR предоставляет услугу доставки только оригинальных
          товаров с крупнейшего китайского маркетплейса Poizon, чтобы наши
          клиенты экономили более 40% на каждой покупке.
        </p>

        <p className='about__text'>
          Работаем без посредников, благодаря чему можем предоставлять лучшую
          цену. Быстрая, бесплатная доставка.
        </p>

        <p className='about__text'>
          Сайт, на котором можно будет удобно оформить покупку, не скачивая
          китайское мобильное приложение Poizon, с удобной фильтрацией огромного
          количества товаров, а так же с возможностью сразу увидеть
          окончательную цену товара.
        </p>
      </div>

      <div className='about__advantages'>
        <div className='advantages'>
          {advantagesItems.map((item) => (
            <div
              key={item.id}
              className='advantages__item'
            >
              <div className='advantages__icon'>{item.icon}</div>

              <div>
                <h4 className='advantages__title'>{item.title}</h4>
                <p className='advantages__text'>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
