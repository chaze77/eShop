'use client';

import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { useAppDispatch, useAppSelector } from '@/global/store';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Form,
  Input,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Page() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.auth.status);
  const [nameUser, setNameUser] = useState('');
  const [phoneUser, setPhoneUser] = useState('');

  console.log(user, 'user');

  useEffect(() => {
    if (user) {
      setNameUser(user?.name);
      setPhoneUser(user?.phone);
      console.log('12121212');
    }
  }, [user?.$id]);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const shouldShowLoader = !user || status === 'pending' || status === 'idle';

  if (shouldShowLoader) {
    return <LoaderOverlay show />;
  }

  return (
    <Card>
      <CardHeader>
        <h2 className='text-xl font-semibold'>Редактировать профиль</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form onSubmit={onSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              isRequired
              name='name'
              label='Имя'
              placeholder='Иван Иванов'
              errorMessage='имя не должно быть пустым'
              validate={(value) => {
                if (value.length < 3) {
                  return 'Username must be at least 3 characters long';
                }
              }}
              variant='bordered'
              value={nameUser}
              onChange={(e) => {
                setNameUser(e.target.value);
              }}
            />
            <Input
              name='email'
              label='Email'
              type='email'
              placeholder='ivan@example.com'
              variant='bordered'
              value={user?.email}
              isDisabled
            />
            <Input
              name='phone'
              label='Телефон'
              placeholder='+996 550 555 555'
              variant='bordered'
              value={phoneUser}
              onChange={(e) => {
                setPhoneUser(e.target.value);
              }}
            />
          </div>
          <div className='mt-6'>
            <Button
              color='primary'
              type='submit'
            >
              Сохранить
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
