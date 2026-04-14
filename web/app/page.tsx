import { cacheLife } from 'next/cache';
import { appwriteKeys } from '@/appwrite/environment';
import { fetchDocuments } from '@/lib/apis/api';
import { ICategory } from '@/common/types';
import Container from '@/common/components/ui/Container/Container';
import MainBanner from '@/common/components/main/banner/MainBanner';
import { Suspense } from 'react';
import HomeClient from './HomeClient';
import About from '@/common/components/main/about/About';
import Blog from '@/common/components/main/blog/Blog';
import { SkeletonProducts } from '@/common/components/ui/SkeletonProducts/SkeletonProducts';

async function getCategories(): Promise<ICategory[]> {
  'use cache';
  cacheLife('days');

  try {
    const response = await fetchDocuments(
      appwriteKeys.DATABASE_ID,
      appwriteKeys.CATEGORIES_COLLECTION_ID,
    );
    return response as ICategory[];
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error);
    return [];
  }
}

export default async function Page() {
  const productsByCategory = await getCategories();

  return (
    <main className='main'>
      <Container>
        <MainBanner />
        <Suspense fallback={<SkeletonProducts />}>
          <HomeClient categories={productsByCategory} />
        </Suspense>
        <About />
        <Blog />
      </Container>
    </main>
  );
}
