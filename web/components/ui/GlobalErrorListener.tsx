'use client';

import { useEffect, useState, useCallback } from 'react';
import ErrorModal from './ErrorModal';
import { useRouter } from 'next/navigation';

export default function GlobalErrorListener() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const router = useRouter();

  const close = useCallback(() => setOpen(false), []);
  const retry = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  useEffect(() => {
    const onAppError = (e: Event) => {
      const detail = (e as CustomEvent)?.detail as string | undefined;
      setMessage(detail || 'Произошла ошибка при загрузке данных.');
      setOpen(true);
    };
    const onOffline = () => {
      setMessage('Похоже, нет соединения с интернетом.');
      setOpen(true);
    };
    const onOnline = () => {
      // можно автоматически скрывать при восстановлении сети
      // setOpen(false);
    };
    window.addEventListener('app:error', onAppError as EventListener);
    window.addEventListener('offline', onOffline);
    window.addEventListener('online', onOnline);
    return () => {
      window.removeEventListener('app:error', onAppError as EventListener);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('online', onOnline);
    };
  }, []);

  return (
    <ErrorModal
      open={open}
      message={message}
      onClose={close}
      onRetry={retry}
    />
  );
}
