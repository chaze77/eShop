import { FC, use } from 'react';

import useMedia from 'use-media-antd-query';
import './BannerSlide.css';

type BannerSlideProps = {
  imageDesktop: string;
  imageMobile?: string;
  title: string;
  subTitle: string;
  textColor: string;
  colorOverlay: string;
};

const BannerSlide: FC<BannerSlideProps> = ({
  imageDesktop,
  imageMobile,
  title,
  subTitle,
  textColor,
  colorOverlay,
}) => {
  console.log('imageMobile:', imageMobile);

  const screen = useMedia();

  const isMobile = screen === 'xs' || screen === 'sm';
  return (
    <div className='banner-slide'>
      <div
        className='banner-slide__bg'
        style={{
          backgroundImage: `url(${isMobile ? imageMobile || 'https://via.placeholder.com/1920x600' : imageDesktop || 'https://via.placeholder.com/1920x600'})`,
          // backgroundColor: colorOverlay,
        }}
      >
        <div className='banner-slide__content'>
          <h1
            className='banner-slide__title'
            style={{ color: textColor }}
          >
            {title || 'title'}
          </h1>
          <p
            className='banner-slide__text'
            style={{ color: textColor }}
          >
            {subTitle || 'subtitle'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
