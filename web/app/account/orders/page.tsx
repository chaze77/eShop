'use client';

import { Card, Divider, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

const mockOrders = [
  {
    id: '4353',
    date: '27 Июня, 12:34',
    status: 'Отправлен',
    total: '14 798 ₽',
    items: 6,
  },
  {
    id: '4120',
    date: '01 Июня, 10:15',
    status: 'Доставлен',
    total: '7 990 ₽',
    items: 2,
  },
];

export default function Page() {
  return (
    <div>
      <Title level={3}>Мои заказы</Title>

      {mockOrders.map((o) => (
        <Card
          key={o.id}
          style={{ marginBottom: 16 }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Text strong>Заказ #{o.id}</Text>
              <br />
              <Text type='secondary'>Оформлен {o.date}</Text>
            </div>

            <Tag color='green'>{o.status}</Tag>
          </div>

          <Divider />

          {/* Body */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Text type='secondary'>Позиций: {o.items}</Text>
            <Text strong>Итого: {o.total}</Text>
          </div>
        </Card>
      ))}
    </div>
  );
}
