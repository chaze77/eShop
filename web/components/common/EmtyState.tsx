'use client';

export default function EmptyState({
  title = 'Ничего не найдено',
  description = 'Попробуйте изменить фильтры или вернуться позже.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className='flex flex-col items-center justify-center h-full text-center py-20 text-gray-400'>
      <svg
        className='w-16 h-16 mb-4 text-gray-500'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      <h2 className='text-xl font-semibold'>{title}</h2>
      <p className='mt-2 max-w-md'>{description}</p>
    </div>
  );
}
