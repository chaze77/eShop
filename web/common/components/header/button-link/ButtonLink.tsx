import { Button } from 'antd';
import Link from 'next/link';
import { ReactNode } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './button-link.css';
type ButtonLinkProps = {
  href: string;
  icon?: ReactNode;

  disabled?: boolean;
  text?: string;
  onClick?: () => void;
  loading?: boolean;
};

export function ButtonLink({
  href,
  icon,

  text,
  disabled = false,
  onClick,
  loading = false,
}: ButtonLinkProps) {
  const buttonType: 'primary' | 'text' = loading
    ? 'text'
    : text
      ? 'primary'
      : 'text';

  return (
    <Link
      href={href}
      prefetch={true}
      style={disabled ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
    >
      <Button
        type={buttonType}
        icon={loading ? <LoadingOutlined style={{ fontSize: 20 }} /> : icon}
        className='header-icon'
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            onClick?.();
          }
        }}
      >
        {text}
      </Button>
    </Link>
  );
}
