'use client';

import { useEffect, useState, useCallback } from 'react';
import ErrorModal from './ErrorModal';
import { useRouter } from 'next/navigation';
import { emitter } from '@/global/events/event-bus';

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
    const onError = (msg: string) => {
      setMessage(msg);
      setOpen(true);
    };
    const onOffline = () => {
      setMessage('Нет соединения с интернетом');
      setOpen(true);
    };

    emitter.on('app:error', onError);
    emitter.on('app:offline', onOffline);
    return () => {
      emitter.off('app:error', onError);
      emitter.on('app:offline', onOffline);
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
