'use client';

import { Modal, Button, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { labels } from '@/constants/labels';

const { Text } = Typography;

interface MVPNoticeModalProps {
  open: boolean;
  onClose: () => void;
  text: string;
}

const MVPNoticeModal = ({ open, onClose, text }: MVPNoticeModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      maskClosable
      title={
        <span>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
        </span>
      }
    >
      <Text>{text}</Text>

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <Button
          type='primary'
          onClick={onClose}
        >
          {labels.common.ok}
        </Button>
      </div>
    </Modal>
  );
};

export default MVPNoticeModal;
