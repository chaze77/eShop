'use client';

import CustomButton from '@/common/components/ui/CustomButton';
import { BUTTON_TYPE } from '@/common/types';
import { labels } from '@/constants/labels';
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
        variant={BUTTON_TYPE.FIRST}
        text={labels.common.goToPayment}
        onClick={onCheckout}
      />
    </div>
  );
};

export default CartFooter;
