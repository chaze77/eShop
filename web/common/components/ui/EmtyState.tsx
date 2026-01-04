'use client';

import { Empty, Typography } from 'antd';

const { Text } = Typography;

export default function EmptyState({
  title = 'empty',
  description = 'empty',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div
      style={{
        padding: '80px 0',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Empty
        description={
          <>
            <Text strong>{title}</Text>
            <br />
            <Text type='secondary'>{description}</Text>
          </>
        }
      />
    </div>
  );
}
