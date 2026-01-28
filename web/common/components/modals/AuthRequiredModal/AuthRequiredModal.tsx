'use client';

import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { labels } from '@/constants/labels';
import './AuthRequiredModal.css';

const { Title, Text } = Typography;

type Props = {
  open: boolean;
  onClose: () => void;
  href?: string;
  actionLabel?: string;
  returnTo?: string;
};

export default function AuthRequiredModal({
  open,
  onClose,
  href = '/login',
  actionLabel = labels.modal.authRequired.actionLabel,
  returnTo,
}: Props) {
  const router = useRouter();

  const handleGo = () => {
    const url = returnTo
      ? `${href}?returnTo=${encodeURIComponent(returnTo)}`
      : href;
    onClose();
    router.push(url);
  };

  return (
    <Modal
      className='auth-required-modal'
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable
      width={860}
    >
      <div className='auth-required-modal__header'>
        <Title
          level={2}
          className='auth-required-modal__title'
        >
          {labels.modal.authRequired.titlePrefix} {actionLabel}
        </Title>
      </div>

      <div className='auth-required-modal__divider' />

      <div className='auth-required-modal__body'>
        <Text className='auth-required-modal__text'>
          {labels.modal.authRequired.bodyPrefix}{' '}
          <span className='auth-required-modal__icon'>
            <HeartFilled />
          </span>{' '}
          {actionLabel}, {labels.modal.authRequired.bodySuffix}
        </Text>

        <div className='auth-required-modal__actions'>
          <Button
            type='primary'
            size='large'
            onClick={handleGo}
            className='auth-required-modal__button'
          >
            {labels.modal.authRequired.actionButton}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
