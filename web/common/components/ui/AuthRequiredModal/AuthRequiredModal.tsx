'use client';

import React from 'react';
import { Modal, Button, Typography, Space } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

type Props = {
  open: boolean;
  onClose: () => void;
  /** куда вести на логин/регистрацию */
  href?: string; // default: /login
  /** под что именно гейт (favorites/cart/etc) */
  actionLabel?: string; // default: "save items to favorites"
  /** optional: если хочешь после логина вернуться назад */
  returnTo?: string;
};

export default function AuthRequiredModal({
  open,
  onClose,
  href = '/login',
  actionLabel = 'save items to favorites',
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
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable
      width={860}
    >
      {/* Header */}
      <div style={{ padding: '24px 28px 18px' }}>
        <Title
          level={2}
          style={{ margin: 0 }}
        >
          Sign In to {actionLabel}
        </Title>
      </div>

      <div style={{ height: 1, background: '#f0f0f0' }} />

      {/* Body */}
      <div style={{ padding: '26px 28px 28px' }}>
        <Text style={{ fontSize: 18, lineHeight: 1.6 }}>
          In order to{' '}
          <Space size={6}>
            <HeartFilled style={{ color: '#cf1322' }} />
          </Space>{' '}
          {actionLabel}, you must be signed in. If you don’t have an account,
          you will have to register to create one.
        </Text>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}
        >
          <Button
            type='primary'
            size='large'
            onClick={handleGo}
            style={{
              height: 54,
              padding: '0 28px',
              borderRadius: 10,
              background: '#111',
            }}
          >
            SIGN IN / REGISTER
          </Button>
        </div>
      </div>
    </Modal>
  );
}
