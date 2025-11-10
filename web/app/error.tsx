'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const offline =
    typeof navigator !== 'undefined' && navigator && !navigator.onLine;

  return (
    <main className='min-h-[60vh] flex items-center justify-center p-6'>
      <div className='max-w-md w-full text-center space-y-4'>
        <h2 className='text-xl font-semibold'>Не удалось загрузить страницу</h2>
        <p className='text-gray-500'>
          {offline
            ? 'Похоже, нет соединения с интернетом.'
            : 'Произошла ошибка при загрузке данных.'}
        </p>
        <div className='flex gap-3 justify-center'>
          <button
            className='px-4 py-2 rounded bg-black text-white'
            onClick={() => reset()}
          >
            Повторить
          </button>
          <button
            className='px-4 py-2 rounded border'
            onClick={() => router.refresh()}
          >
            Обновить
          </button>
        </div>
      </div>
    </main>
  );
}
