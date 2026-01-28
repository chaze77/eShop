import { FC } from 'react';
import CustomButton from '../../ui/CustomButton';
import './BannerSlide.css';
import { BUTTON_TYPE } from '@/common/types';
import { labels } from '@/constants/labels';

interface IBannerSlideProps {
  image: string;
  title: string;
  text: string;
}

const BannerSlide: FC<IBannerSlideProps> = ({ image, title, text }) => {
  return (
    <div className='banner-slide'>
      <div
        className='banner-slide__bg'
        style={{
          backgroundImage: `url('${image || '/assets/banner.png'}')`,
        }}
      >
        <div className='banner-slide__content'>
          <h1 className='banner-slide__title'>
            {title || 'Широкий ассортимент Одежды'}
          </h1>
          <p className='banner-slide__text'>
            {text ||
              'Одежда от известных брендов у нас в каталоге. Только качественные вещи'}
          </p>
          <CustomButton
            variant={BUTTON_TYPE.FIRST}
            text={labels.common.learnMore}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
