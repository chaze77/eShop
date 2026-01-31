import { Space, Flex } from 'antd';
import Image from 'next/image';
import tg from '../../images/tg.png';
import './footer-contacts.css';
import { labels } from '@/constants/labels';

export function FooterContacts() {
  return (
    <Flex vertical>
      <Space>
        <span className='xwear-footer__subtitle'>{labels.footer.connect}</span>

        <a
          href='https://t.me/daniyarch'
          target='_blank'
          rel='noopener noreferrer'
          className='xwear-footer__social-link'
        >
          <Image
            src={tg}
            alt='Telegram'
            width={24}
            height={24}
          />
        </a>
      </Space>

      <span className='xwear-footer__subtitle'>
        Демо проект Не является коммерческим сервисом.•
        <br />
        Для связи кликните на tg инкоку
      </span>
    </Flex>
  );
}
