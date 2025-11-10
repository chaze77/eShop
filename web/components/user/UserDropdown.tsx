'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

import { useRouter } from 'next/navigation';
import UserIcon from '../icons/UserIcon';
import LogoutModal from './LogoutModal';
import { useAppDispatch } from '@/global/store';
import { logoutThunk } from '@/global/features/auth-slice';
import { useState } from 'react';

export default function UserDropdown({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = async () => {
    await dispatch(logoutThunk());
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered'>
            {' '}
            <UserIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions'>
          <DropdownItem key='new'>cart</DropdownItem>
          <DropdownItem key='copy'>setting</DropdownItem>
          <DropdownItem
            key='edit'
            onPress={openModal}
          >
            logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <LogoutModal
        isOpen={open}
        onConfirm={logout}
      />
    </div>
  );
}
