'use client';

import LoaderOverlay from '@/components/ui/LoaderOverlay';
import { useAppSelector } from '@/global/store';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

export default function Page() {
  const user = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.auth.status);

  const shouldShowLoader = !user || status === 'pending' || status === 'idle';

  if (shouldShowLoader) {
    return <LoaderOverlay show />;
  }

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Мой аккаунт</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className='text-gray-600 mb-2'>{user.name}</p>
        <p className='text-gray-600 mb-2'>{user.email}</p>
        <p className='text-gray-600'>Телефон: {user.phone}</p>
      </CardBody>
    </Card>
  );
}
