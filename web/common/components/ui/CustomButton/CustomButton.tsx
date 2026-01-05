import React from 'react';
import { Button } from 'antd';
import ArrayRight from '../../icons/ArrayRight';
import './CustomButton.scss';

interface CustomButtonProps {
  action?: 'first' | 'second';
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  text: string;
}

const CustomButton: React.FC<
  CustomButtonProps & React.ComponentProps<typeof Button>
> = ({
  action = 'first',
  onClick,
  htmlType = 'button',
  disabled = false,
  text,
  ...props
}) => {
  const actionConfig: Record<
    string,
    {
      className: string;
      styleType: 'primary' | 'text' | 'default';
      iconColor: string;
    }
  > = {
    first: {
      className: 'custom-button custom-button--first',
      styleType: 'default',
      iconColor: 'white',
    },
    second: {
      className: 'custom-button custom-button--second',
      styleType: 'text',
      iconColor: 'black',
    },
  };

  const { className, styleType, iconColor } = actionConfig[action] || {
    className: 'custom-button',
    styleType: 'default',
    iconColor: 'black',
  };

  return (
    <Button
      className={className}
      onClick={onClick}
      htmlType={htmlType}
      type={styleType}
      disabled={disabled}
      icon={<ArrayRight color={iconColor} />}
      iconPlacement='end'
      {...props}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
