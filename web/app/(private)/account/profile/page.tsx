'use client';

import MVPNoticeModal from '@/common/components/modals/MVPModal/MVPModal';
import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { useMVPModal } from '@/common/hooks/useShowMVPModal';
import { messages } from '@/constants/messages';
import { useAppSelector } from '@/global/store';
import { Button, Card, Divider, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';

export default function Page() {
  const user = useAppSelector((state) => state.auth.user);
  const status = useAppSelector((state) => state.auth.status);
  const { open, closeModal, openModal } = useMVPModal();

  const [form] = Form.useForm();
  const { Title } = Typography;

  useEffect(() => {
    if (!user) return;

    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }, [user?.$id, form]);

  const onFinish = (values: {
    name: string;
    email?: string;
    phone?: string;
  }) => {
    openModal();
    console.log('submit profile form', values);
  };

  const shouldShowLoader = !user || status === 'pending' || status === 'idle';
  if (shouldShowLoader) return <LoaderOverlay show />;

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
          >
            <Input placeholder='Ваше имя' />
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
            <Input placeholder='+996 550 555 555' />
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
        <MVPNoticeModal
          open={open}
          onClose={closeModal}
          text={messages.modal.mvpText}
        />
      </Form>
    </Card>
  );
}
