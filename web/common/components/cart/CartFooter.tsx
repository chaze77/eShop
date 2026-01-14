'use client';

import CustomButton from '@/common/components/ui/CustomButton';
import { Typography } from 'antd';

const { Text } = Typography;

interface CartFooterProps {
  total: number;
  formatMoney: (n: number) => string;
  onCheckout: () => void;
}

const CartFooter = ({ total, formatMoney, onCheckout }: CartFooterProps) => {
  return (
    <div className='cart__footer'>
      <div className='cart__total'>
        <Text type='secondary'>Общее количество </Text>
        <Text className='cart__totalValue'>{formatMoney(total)} сом</Text>
      </div>

      <CustomButton
        action='first'
        text='Proceed to Checkout'
        onClick={onCheckout}
      />
    </div>
  );
};

export default CartFooter;
