import { useEffect } from 'react';
import { Modal, Form, Input, Button, Space } from 'antd';

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
          label='Наименование'
          name='name'
          rules={[{ required: true, message: 'Введите наименование' }]}
        >
          <Input placeholder='Введите наименование' />
        </Form.Item>
        <Space>
          {' '}
          <Button
            type='primary'
            htmlType='submit'
          >
            Сохранить
          </Button>
          <Button
            color='default'
            variant='filled'
            onClick={onCancel}
          >
            Закрыть
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default EditModal;
