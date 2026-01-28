import React from 'react';
import './custom-button.css';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface CustomButtonProps {
  variant?: 'first' | 'second' | 'third';
  onClick?: () => void | AppRouterInstance | Promise<void>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  text?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'first',
  onClick,
  type = 'button',
  disabled = false,
  text,
  ...props
}) => {
  let className = 'custom-button';

  switch (variant) {
    case 'first':
      className = 'custom-button custom-button-first';
      break;

    case 'second':
      className = 'custom-button custom-button-second';
      break;

    case 'third':
      className = 'custom-button custom-button-third';
      break;

    default:
      className = 'custom-button custom-button-first';
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={variant === 'third' ? 'Back' : undefined}
      {...props}
    >
      {variant !== 'third' && (
        <span className='custom-button-text'>{text}</span>
      )}

      <span className='custom-button-icon'>
        {variant === 'third' ? <LeftOutlined /> : <RightOutlined />}
      </span>
    </button>
  );
};

export default CustomButton;
