'use client';

import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const offline = typeof navigator !== 'undefined' && !navigator.onLine;

  return (
    <html>
      <body>
        <main className='min-h-screen flex items-center justify-center p-6'>
          <div className='max-w-md text-center space-y-4'>
            <h2 className='text-xl font-semibold'>
              Не удалось загрузить приложение
            </h2>
            <p className='text-gray-500'>
              {offline
                ? 'Похоже, нет соединения с интернетом.'
                : 'Произошла ошибка при рендеринге на сервере.'}
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
            {process.env.NODE_ENV === 'development' && (
              <pre className='text-left text-xs text-gray-400 whitespace-pre-wrap'>
                {error?.message}
              </pre>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
