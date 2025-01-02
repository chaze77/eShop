'use client';

import { Button } from '@nextui-org/react';
import MainBanner from './components/main/MainBanner';

export default function Home() {
  return (
    <main className='w-full min-h-screen flex justify-start'>
      <MainBanner />
    </main>
  );
}
