import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './LoaderOverlay.css';

type SpinnerProps = { show: boolean };

export default function LoaderOverlay({ show }: SpinnerProps) {
  if (!show) return null;
  return (
    <div className='loader-overlay'>
      <div className='loader-overlay__box'>
        <Spin
          indicator={<LoadingOutlined spin />}
          size='large'
        />
      </div>
    </div>
  );
}

