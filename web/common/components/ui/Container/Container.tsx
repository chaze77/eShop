import React, { ReactNode } from 'react';

import './Container.scss';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={'container'}>{children}</div>;
};

export default Container;
