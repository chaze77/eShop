import MainBanner from '../components/main/banner/MainBanner';
import About from '../components/main/about/About';
import Blog from '../components/main/blog/Blog';
import Container from '../components/ui/Container';
import Products from '../components/products/Products';
import { fetchDocuments } from '@/lib/api';
import { ICategory } from '@/types';

const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_CATEGORIES_COLLECTION_ID!;
export default async function Home() {
  const productsByCategory = await fetchDocuments(DATABASE_ID, COLLECTION_ID);

  return (
    <main className='flex flex-col  items-center'>
      <Container className='max-w-[1500px] w-full'>
        <MainBanner />
        <Products items={productsByCategory as ICategory[]} />
        <About />
        <Blog />
      </Container>
    </main>
  );
}
