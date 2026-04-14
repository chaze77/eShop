// Loader.jsx

import { Spin } from 'antd';
import './loader.less';

type Props = {
  show: boolean;
};

const Loader = ({ show }: Props) => {
  if (!show) return null;

  return (
    <div className='loader-position'>
      <Spin size='large' />
    </div>
  );
};

export default Loader;
