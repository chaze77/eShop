'use client';

import { Button, Card, Divider, Form, Input, Typography } from 'antd';

export default function Page() {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const onFinish = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log('change password', values);
  };

  return (
    <Card>
      <Title
        level={4}
        style={{ marginBottom: 0 }}
      >
        Смена пароля
      </Title>
      <Divider />
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Form.Item
            name='currentPassword'
            label='Текущий пароль'
            rules={[{ required: true, message: 'Введите текущий пароль' }]}
          >
            <Input.Password placeholder='Введите текущий пароль' />
          </Form.Item>

          <div />

          <Form.Item
            name='newPassword'
            label='Новый пароль'
            rules={[{ required: true, message: 'Введите новый пароль' }]}
          >
            <Input.Password placeholder='Введите новый пароль' />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label='Подтвердите новый пароль'
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Повторите новый пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password placeholder='Введите новый пароль повторно' />
          </Form.Item>
        </div>

        <div className='mt-6'>
          <Button
            type='primary'
            htmlType='submit'
          >
            Сохранить пароль
          </Button>
        </div>
      </Form>
    </Card>
  );
}
