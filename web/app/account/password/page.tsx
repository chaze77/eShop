"use client";

import { Button, Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react';

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Пароль</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Текущий пароль" type="password" variant="bordered" />
          <div />
          <Input label="Новый пароль" type="password" variant="bordered" />
          <Input label="Повторите новый пароль" type="password" variant="bordered" />
        </div>
        <div className="mt-6">
          <Button color="primary" isDisabled>
            Обновить пароль (скоро)
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

