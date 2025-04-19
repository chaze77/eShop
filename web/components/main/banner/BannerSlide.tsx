import { FC } from 'react';
import CustomButton from '../../ui/CustomButton';

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
    <div className='h-[600px]'>
      <div
        className='h-full w-full bg-cover bg-no-repeat bg-center rounded-[7px] flex items-center'
        style={{
          backgroundImage: "url('/assets/banner.png')",
        }}
      >
        <div className='max-w-[600px] text-left pl-12 bg-white bg-opacity-0'>
          <h1 className='text-black text-5xl font-rfdewi font-black uppercase leading-snug mb-4'>
            Широкий ассортимент Одежды
          </h1>
          <p className='text-gray-700 mb-4'>
            Одежда от известных брендов у нас в каталоге. Только качественные
            вещи.
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
