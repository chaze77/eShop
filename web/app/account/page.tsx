"use client";

import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Мой аккаунт</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-gray-600 mb-2">Имя: Иван Иванов</p>
        <p className="text-gray-600 mb-2">Email: ivan@example.com</p>
        <p className="text-gray-600">Телефон: +7 (900) 000-00-00</p>
      </CardBody>
    </Card>
  );
}

