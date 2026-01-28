'use client';

import { useAppSelector } from '@/global/store';
import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { redirect } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  if (status === 'idle' || status === 'pending') {
    return <LoaderOverlay show />;
  }

  if (isAuthenticated) {
    redirect('/');
  }

  return <>{children}</>;
}
