import { FC } from 'react';
import CustomButton from '../../ui/CustomButton';
import './BannerSlide.scss';

interface IBannerSlideProps {
  image: string;
  title: string;
  text: string;
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

const BannerSlide: FC<IBannerSlideProps> = ({
  image,
  title,
  text,
  handlePrevClick,
  handleNextClick,
}) => {
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
            action='first'
            text='перейти в каталог'
          />
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
