import MainBanner from '@/components/main/banner/MainBanner';
import About from '@/components/main/about/About';
import Blog from '@/components/main/blog/Blog';
import Container from '@/components/ui/Container';
import HomeClient from './HomeClient';
import { fetchDocuments } from '@/lib/api';
import { ICategory } from '@/types';
import { appwriteKeys } from '@/appwrite/environment';
import { notFound } from 'next/navigation';

export default async function Home() {
  let productsByCategory: ICategory[] = [];

  productsByCategory = await fetchDocuments<ICategory>(
    appwriteKeys.DATABASE_ID,
    appwriteKeys.CATEGORIES_COLLECTION_ID
  );
  if (!productsByCategory.length) {
    notFound();
  }

  return (
    <main className='flex flex-col  items-center'>
      <Container className='max-w-[1500px] w-full'>
        <MainBanner />
        <HomeClient categories={productsByCategory as ICategory[]} />
        <About />
        <Blog />
      </Container>
    </main>
  );
}
