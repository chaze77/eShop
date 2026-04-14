// components/MainBanner/index.tsx  ← серверный компонент (без 'use client')

import { getBanners } from '@/lib/apis/banners';
import BannerCarousel from './BannerCarousel';

const MainBanner = async () => {
  const banners = await getBanners();

  if (!banners.length) return null;

  return <BannerCarousel banners={banners} />;
};

export default MainBanner;
