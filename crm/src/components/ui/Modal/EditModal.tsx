import { useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';
import { LABELS } from '@/constants/labels';
import { MESSAGES } from '@/constants/messages';

interface EditModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: { name: string }) => void;
  initialValues?: { name: string };
}

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onCancel,
  onSave,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={onSave}
      >
        <Form.Item
          label={LABELS.fields.name}
          name='name'
          rules={[{ required: true, message: MESSAGES.validation.emptyName }]}
        >
          <Input placeholder={LABELS.placeholders.name} />
        </Form.Item>
        <Space>
          {' '}
          <Button
            type='primary'
            htmlType='submit'
          >
            {LABELS.buttons.save}
          </Button>
          <Button
            color='default'
            variant='filled'
            onClick={onCancel}
          >
            {LABELS.buttons.close}
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default EditModal;
