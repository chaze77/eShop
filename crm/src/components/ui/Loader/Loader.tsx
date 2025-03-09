// Loader.jsx

import { Spin } from 'antd';
import useLoaderStore from '@/store/useLoaderStore';
import './loader.less';

const Loader = () => {
  const loading = useLoaderStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className='loader-position'>
      <Spin size='large' />
    </div>
  );
};

export default Loader;
