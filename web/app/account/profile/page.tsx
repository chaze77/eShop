"use client";

import { Button, Card, CardBody, CardHeader, Divider, Input, Textarea } from '@nextui-org/react';

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Редактировать профиль</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Имя" placeholder="Иван Иванов" variant="bordered" />
          <Input label="Email" type="email" placeholder="ivan@example.com" variant="bordered" />
          <Input label="Телефон" placeholder="+7 (900) 000-00-00" variant="bordered" />
          <Textarea label="О себе" placeholder="Расскажите немного о себе" variant="bordered" className="md:col-span-2" />
        </div>
        <div className="mt-6">
          <Button color="primary" isDisabled>
            Сохранить (скоро)
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

