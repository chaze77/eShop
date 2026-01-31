'use client';

import MVPNoticeModal from '@/common/components/modals/MVPModal/MVPModal';
import { useMVPModal } from '@/common/hooks/useShowMVPModal';
import { labels } from '@/constants/labels';
import { messages } from '@/constants/messages';
import { Button, Card, Divider, Form, Input, Typography } from 'antd';

export default function Page() {
  const [form] = Form.useForm();
  const { Title } = Typography;

  const { open, closeModal, openModal } = useMVPModal();

  const onFinish = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    openModal();
  };

  return (
    <Card>
      <Title level={4}>{labels.fields.changePassword}</Title>
      <Divider />
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
      >
        <div>
          <Form.Item
            name='currentPassword'
            label={labels.fields.currentPassword}
            rules={[
              { required: true, message: labels.validation.passwordRequired },
            ]}
          >
            <Input.Password placeholder={labels.placeholders.password} />
          </Form.Item>

          <div />

          <Form.Item
            name='newPassword'
            label={labels.fields.newPassword}
            rules={[
              { required: true, message: labels.validation.passwordRequired },
            ]}
          >
            <Input.Password placeholder={labels.placeholders.password} />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label={labels.fields.confirmPassword}
            dependencies={['newPassword']}
            rules={[
              { required: true, message: labels.validation.repeatPassword },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(labels.validation.notEqualPassword),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder={labels.validation.repeatPassword} />
          </Form.Item>
        </div>

        <div>
          <Button
            type='primary'
            htmlType='submit'
          >
            {labels.common.save}
          </Button>
          <MVPNoticeModal
            open={open}
            onClose={closeModal}
            text={messages.modal.mvpText}
          />
        </div>
      </Form>
    </Card>
  );
}
