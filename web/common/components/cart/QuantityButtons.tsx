'use client';

import { Button, Flex } from 'antd';
import './QuantityButtons.css';

type QuantityButtonsProps = {
  value: number;
  availableQty: number;
  onChange: (nextQty: number) => void;
  disabled?: boolean;
};

const QuantityButtons = ({
  value,
  availableQty,
  onChange,
  disabled = false,
}: QuantityButtonsProps) => {
  const handleMinus = () => {
    if (value <= 1) return;
    onChange(value - 1);
  };

  const handlePlus = () => {
    if (value >= availableQty) return;
    onChange(value + 1);
  };

  return (
    <Flex
      justify='center'
      align='center'
      gap={2}
    >
      <Button
        onClick={handleMinus}
        disabled={disabled || value <= 1}
      >
        –
      </Button>

      <div className='cartItem__qtyNumber'>
        <span>{value}</span>
      </div>

      <Button
        onClick={handlePlus}
        disabled={disabled || value >= availableQty}
      >
        +
      </Button>
    </Flex>
  );
};

export default QuantityButtons;

