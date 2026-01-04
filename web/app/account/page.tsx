'use client';

import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { useAppSelector } from '@/global/store';
import { Card, Divider } from 'antd';

export default function Page() {
  const user = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.auth.status);

  const shouldShowLoader = !user || status === 'pending' || status === 'idle';

  if (shouldShowLoader) {
    return <LoaderOverlay show />;
  }

  return (
    <Card>
      <h2>Мой аккаунт</h2>

      <Divider />

      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>Телефон: {user.phone}</p>
      </div>
    </Card>
  );
}
