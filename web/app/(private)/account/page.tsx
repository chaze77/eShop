'use client';

import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { labels } from '@/constants/labels';
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
      <h2>{labels.fields.userAccount}</h2>

      <Divider />

      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p> {`${labels.fields.phone}: ${user.phone}`}</p>
      </div>
    </Card>
  );
}
