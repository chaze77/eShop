'use client';

import { useState } from 'react';
import { Dropdown, Modal, MenuProps } from 'antd';
import UserIcon from '@/common/components/icons/UserIcon';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { logoutThunk } from '@/global/features/auth-slice';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/showMessage';
import { PageConfig } from '@/constants/pageConfig';
import { messages } from '@/constants/messages';
import './UserDropdown.css';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const displayName = user?.name || user?.email || 'не найден,';

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
      label: 'Профиль',
    },
    {
      key: 'favorites',
      label: 'Избранное',
    },
    {
      key: 'cart',
      label: 'Корзина',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Выйти',
      danger: true,
    },
  ];

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      setConfirmVisible(true);
      return;
    }
    if (key === 'profile') router.push(PageConfig.ACCOUNT);
    if (key === 'favorites') router.push(PageConfig.FAVORITE);
    if (key === 'cart') router.push(PageConfig.CART);
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
        okText='Ok'
        cancelText='Cancel'
        title='title'
      >
        <p>{messages.modal.logout}</p>
      </Modal>
    </>
  );
}
