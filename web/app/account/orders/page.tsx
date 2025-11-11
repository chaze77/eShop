"use client";

import { Card, CardBody, CardHeader, Divider, Chip } from '@nextui-org/react';

const mockOrders = [
  { id: '4353', date: '27 Июня, 12:34', status: 'Отправлен', total: '14 798 ₽', items: 6 },
  { id: '4120', date: '01 Июня, 10:15', status: 'Доставлен', total: '7 990 ₽', items: 2 },
];

export default function Page() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Мои заказы</h2>
      {mockOrders.map((o) => (
        <Card key={o.id}>
          <CardHeader className="flex justify-between items-center">
            <div>
              <div className="font-semibold">Заказ #{o.id}</div>
              <div className="text-sm text-gray-500">Оформлен {o.date}</div>
            </div>
            <Chip color="success" variant="flat">
              {o.status}
            </Chip>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Позиций: {o.items}</span>
              <span className="font-semibold">Итого: {o.total}</span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}

