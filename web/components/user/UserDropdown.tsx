'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import UserIcon from '@/components/icons/UserIcon';
import { useAppDispatch, useAppSelector } from '@/global/store';
import { logoutThunk } from '@/global/features/auth-slice';
import { useRouter } from 'next/navigation';
import { showToast } from '@/helpers/showMessage';

export default function UserDropdown() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const displayName = user?.name || user?.email || 'Аккаунт';

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      onClose();

      router.push('/');
    } catch (e) {
      showToast('error', e as string);
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button
            aria-label='Профиль'
            className='p-1 cursor-pointer text-white hover:text-sky-400 transition-colors'
          >
            <UserIcon />
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Меню пользователя'
          onAction={(key) => {
            if (key === 'logout') onOpen();
            if (key === 'profile') router.push('/account');
            if (key === 'favorites') router.push('/favorites');
            if (key === 'cart') router.push('/cart');
          }}
        >
          <DropdownItem
            key='user'
            isDisabled
            className='opacity-70'
          >
            {displayName}
          </DropdownItem>
          <DropdownItem key='profile'>Профиль</DropdownItem>
          <DropdownItem key='favorites'>Избранное</DropdownItem>
          <DropdownItem key='cart'>Корзина</DropdownItem>
          <DropdownItem
            key='logout'
            className='text-danger'
            color='danger'
          >
            Выйти
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='center'
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Подтвердите выход
              </ModalHeader>
              <ModalBody>
                <p>Вы уверены, что хотите выйти?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant='flat'
                  onPress={onClose}
                >
                  Отмена
                </Button>
                <Button
                  color='danger'
                  onPress={handleLogout}
                >
                  Выйти
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
