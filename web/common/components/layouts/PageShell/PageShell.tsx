'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Container from '../../ui/Container/Container';
import CustomButton from '../../ui/CustomButton/CustomButton';
import './page-shell.css';
import { BUTTON_TYPE } from '@/common/types';

type PageShellProps = {
  children: ReactNode;
  className?: string;
  showBack?: boolean;
  title?: ReactNode;
};

export default function PageShell({
  children,
  className = '',
  showBack = true,
  title,
}: PageShellProps) {
  const router = useRouter();

  return (
    <Container className={className}>
      <div className='page-shell'>
        {showBack && (
          <div style={{ marginBottom: '8px' }}>
            <CustomButton
              variant={BUTTON_TYPE.THIRD}
              onClick={() => router.back()}
            />
          </div>
        )}

        {title && <p className='page-shell-title'>{title}</p>}

        {children}
      </div>
    </Container>
  );
}
