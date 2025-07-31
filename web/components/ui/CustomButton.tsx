import React from 'react';
import { Button } from '@nextui-org/react';
import ArrayRight from '../icons/ArrayRight';

type ButtonVariant =
  | 'flat'
  | 'ghost'
  | 'light'
  | 'solid'
  | 'bordered'
  | 'faded'
  | 'shadow';

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
    { className: string; variant: ButtonVariant; iconColor: string }
  > = {
    first: {
      className: 'bg-black text-white uppercase p-8 font-semibold',
      variant: 'ghost',
      iconColor: 'white',
    },
    second: {
      className:
        'bg-transparent text-black uppercase p-1 font-semibold underline mb-1',
      variant: 'light',
      iconColor: 'black',
    },
  };

  const { className, variant, iconColor } = actionConfig[action] || {
    className: '',
    variant: 'solid',
    iconColor: 'black',
  };

  return (
    <Button
      className={className}
      onClick={onClick}
      type={htmlType}
      variant={variant}
      radius='sm'
      disabled={disabled}
      endContent={<ArrayRight color={iconColor} />}
      {...props}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
