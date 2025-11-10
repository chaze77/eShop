import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalContent } from '@nextui-org/react';

type LogoutModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
};

export default function LogoutModal({ isOpen, onOpenChange, onConfirm }: LogoutModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop='opaque'
      classNames={{
        base: 'bg-content1 text-foreground',
        backdrop: 'bg-black/50',
        header: 'border-b border-divider',
        footer: 'border-t border-divider',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Подтверждение</ModalHeader>
            <ModalBody>Вы уверены, что хотите выйти?</ModalBody>
            <ModalFooter>
              <Button variant='light' onPress={onClose}>
                Отмена
              </Button>
              <Button
                color='primary'
                onPress={async () => {
                  await onConfirm();
                  onClose();
                }}
              >
                Подтвердить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

