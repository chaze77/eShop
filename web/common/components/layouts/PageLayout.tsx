'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Container from '../ui/Container/Container';

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  const router = useRouter();

  return (
    <Container className={className}>
      <div className='page-layout'>
        <button
          type='button'
          className='page-layout__back'
          onClick={() => router.back()}
        >
          ← Назад
        </button>

        {children}
      </div>
    </Container>
  );
};

export default PageLayout;
