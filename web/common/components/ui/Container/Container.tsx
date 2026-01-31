import React, { ReactNode } from 'react';
import './container.css';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`container ${className ?? ''}`.trim()}>{children}</div>
  );
};

export default Container;
