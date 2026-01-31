import { Space, Typography, Input, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Text, Link: AntLink } = Typography;

export function FooterSubscribe() {
  return (
    <>
      <Text className='xwear-footer__muted'>
        Будьте в курсе скидок и новостей
      </Text>

      <div className='xwear-footer__subscribe'>
        <Input
          placeholder='Ваш email'
          className='xwear-footer__input'
          suffix={
            <Button
              type='text'
              className='xwear-footer__send'
              icon={<ArrowRightOutlined />}
              aria-label='Подписаться'
            />
          }
        />
      </div>

      <Text className='xwear-footer__tiny'>
        Подписываясь на рассылку вы соглашаетесь с обработкой персональных
        данных
      </Text>

      <div className='xwear-footer__policy'>
        <span className='xwear-footer__policy-link'>
          ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
        </span>
        <span className='xwear-footer__policy-link'>
          ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ
        </span>
      </div>
    </>
  );
}
