import MainBanner from '../common/components/main/banner/MainBanner';
import About from '../common/components/main/about/About';
import Blog from '../common/components/main/blog/Blog';
import Container from '../common/components/ui/Container/Container';
import { fetchDocuments } from '@/lib/apis/api';
import { ICategory } from '@/common/types';
import HomeClient from './HomeClient';
import { Suspense } from 'react';
import { appwriteKeys } from '@/appwrite/environment';
import 'antd/dist/reset.css';

export default async function Home() {
  const productsByCategory = await fetchDocuments(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CATEGORIES_COLLECTION_ID,
  );

  return (
    <main className='main'>
      <Container>
        <MainBanner />
        <Suspense fallback={null}>
          <HomeClient categories={productsByCategory as ICategory[]} />
        </Suspense>
        <About />
        <Blog />
      </Container>
    </main>
  );
}
