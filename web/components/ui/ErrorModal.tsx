'use client';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from '@nextui-org/react';

type ErrorModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onRetry?: () => void;
};

export default function ErrorModal({
  open,
  title = 'Что-то пошло не так',
  message = 'Не удалось получить данные. Проверьте подключение к интернету и попробуйте ещё раз.',
  onClose,
  onRetry,
}: ErrorModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      hideCloseButton
      backdrop='opaque'
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
            <ModalBody>
              <p className='text-sm text-gray-600'>{message}</p>
            </ModalBody>
            <ModalFooter>
              {onRetry && (
                <Button
                  color='primary'
                  variant='solid'
                  onPress={onRetry}
                >
                  Повторить
                </Button>
              )}
              <Button
                color='default'
                variant='flat'
                onPress={onClose}
              >
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
