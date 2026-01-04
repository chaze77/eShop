'use client';

import { useState } from 'react';
import { Button, Dropdown, Modal, MenuProps } from 'antd';
import UserIcon from '@/common/components/icons/UserIcon';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { logoutThunk } from '@/global/features/auth-slice';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/showMessage';
import './UserDropdown.scss';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const displayName = user?.name || user?.email || 'D?D§D§Dø¥ŸD«¥,';

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      setConfirmVisible(false);
      router.push('/');
    } catch (e) {
      showToast('error', e as string);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'user',
      label: displayName,
      disabled: true,
      className: 'user-dropdown__name',
    },
    {
      key: 'profile',
      label: 'profile',
    },
    {
      key: 'favorites',
      label: 'favorites',
    },
    {
      key: 'cart',
      label: 'cart',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'logout',
      danger: true,
    },
  ];

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      setConfirmVisible(true);
      return;
    }
    if (key === 'profile') router.push('/account');
    if (key === 'favorites') router.push('/favorites');
    if (key === 'cart') router.push('/cart');
  };

  return (
    <>
      <Dropdown
        menu={{ items, onClick: onMenuClick }}
        open={open}
        onOpenChange={setOpen}
        trigger={['click']}
      >
        <button
          aria-label='user'
          className='user-dropdown__trigger'
        >
          <UserIcon />
        </button>
      </Dropdown>

      <Modal
        open={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onOk={handleLogout}
        okText='TEST'
        cancelText='TEST'
        title='title'
      >
        <p>TEST</p>
      </Modal>
    </>
  );
}
