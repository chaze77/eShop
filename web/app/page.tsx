'use client';

import MainBanner from './components/main/banner/MainBanner';
import About from './components/main/about/About';
import Blog from './components/main/blog/Blog';
import Container from './components/ui/Container';

export default function Home() {
  return (
    <main className='flex flex-col  items-center'>
      <Container className='max-w-[1500px] w-full'>
        <MainBanner />
        <About />
        <Blog />
      </Container>
    </main>
  );
}
