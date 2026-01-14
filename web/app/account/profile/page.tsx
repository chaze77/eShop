'use client';

import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { useAppSelector } from '@/global/store';
import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';

export default function Page() {
  const user = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.auth.status);

  const [nameUser, setNameUser] = useState('');
  const [phoneUser, setPhoneUser] = useState('');
  const [form] = Form.useForm();

  const { Title } = Typography;

  useEffect(() => {
    if (user) {
      setNameUser(user?.name);
      setPhoneUser(user?.phone);
      form.setFieldsValue({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      });
    }
  }, [user?.$id, form, user?.email, user?.name, user?.phone]);

  const onFinish = (values: { name: string; email?: string; phone?: string }) => {
    console.log('submit profile form', values);
  };

  const shouldShowLoader = !user || status === 'pending' || status === 'idle';

  if (shouldShowLoader) {
    return <LoaderOverlay show />;
  }

  return (
    <Card>
      <Title
        level={4}
        style={{ marginBottom: 0 }}
      >
        Профиль пользователя
      </Title>
      <Divider />
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Form.Item
            name='name'
            label='Имя'
            rules={[
              { required: true, message: 'Введите имя' },
              { min: 3, message: 'Имя должно быть не короче 3 символов' },
            ]}
          >
            <Input
              placeholder='Ваше имя'
              value={nameUser}
              onChange={(e) => {
                setNameUser(e.target.value);
                form.setFieldValue('name', e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
          >
            <Input
              placeholder='ivan@example.com'
              disabled
            />
          </Form.Item>

          <Form.Item
            name='phone'
            label='Телефон'
          >
            <Input
              placeholder='+996 550 555 555'
              value={phoneUser}
              onChange={(e) => {
                setPhoneUser(e.target.value);
                form.setFieldValue('phone', e.target.value);
              }}
            />
          </Form.Item>
        </div>

        <div className='mt-6'>
          <Button
            type='primary'
            htmlType='submit'
          >
            Сохранить
          </Button>
        </div>
      </Form>
    </Card>
  );
}
