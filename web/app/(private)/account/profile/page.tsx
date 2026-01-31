'use client';
import { useEffect } from 'react';
import { Button, Card, Divider, Form, Input, Typography } from 'antd';

import { useAppSelector } from '@/global/store';

import MVPNoticeModal from '@/common/components/modals/MVPModal/MVPModal';
import LoaderOverlay from '@/common/components/ui/LoaderOverlay';
import { useMVPModal } from '@/common/hooks/useShowMVPModal';
import { labels } from '@/constants/labels';
import { messages } from '@/constants/messages';

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
      <Title level={4}>{labels.fields.userAccount}</Title>
      <Divider />

      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <div>
          <Form.Item
            name='name'
            label={labels.placeholders.name}
          >
            <Input placeholder={labels.placeholders.name} />
          </Form.Item>

          <Form.Item
            name='email'
            label={labels.fields.email}
          >
            <Input
              placeholder={labels.placeholders.email}
              disabled
            />
          </Form.Item>

          <Form.Item
            name='phone'
            label={labels.fields.phone}
          >
            <Input placeholder={labels.placeholders.phone} />
          </Form.Item>
        </div>

        <div>
          <Button
            type='primary'
            htmlType='submit'
          >
            {labels.common.save}
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
