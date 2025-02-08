'use client';

import MainBanner from './components/main/banner/MainBanner';
import About from './components/main/about/About';
import Blog from './components/main/blog/Blog';
import Container from './components/ui/Container';
import ProductCard from './components/products/ProductCard';
import Products from './components/products/Products';

export default function Home() {
  return (
    <main className='flex flex-col  items-center'>
      <Container className='max-w-[1500px] w-full'>
        <MainBanner />
        <Products />
        <About />
        <Blog />
      </Container>
    </main>
  );
}
