import { modalTexts } from '@/constants/modalText';
import { Modal } from 'antd';

type ModalType = 'deleteModal' | 'confirmationModal';

interface ShowModalProps {
  type: ModalType;
  onConfirm: () => void;
  onCancel?: () => void;
}

const showModal = ({ type, onConfirm, onCancel }: ShowModalProps) => {
  const { title, content, okText, cancelText } = modalTexts[type];

  Modal.confirm({
    title,
    content,
    okText,
    okType: type === 'deleteModal' ? 'danger' : 'primary',
    cancelText,
    onOk: () => {
      onConfirm();
    },
    onCancel: () => {
      if (onCancel) onCancel();
    },
  });
};

export default showModal;
