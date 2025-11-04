import { Spinner } from '@nextui-org/react';

type SpinnerProps = { show: boolean };

export default function LoaderOverlay({ show }: SpinnerProps) {
  if (!show) return null;
  return (
    <div className='fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center'>
      <div className='bg-white/90 rounded-lg px-6 py-4 shadow-lg'>
        <Spinner
          size='lg'
          label='Загрузка...'
        />
      </div>
    </div>
  );
}
