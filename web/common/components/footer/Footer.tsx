'use client';

import { Row, Typography } from 'antd';
import { FooterColumn } from './components/FooterColumn/FooterColumn';
import { footerInfoLinks } from './constants/footer-data';
import Container from '../ui/Container/Container';
import { FooterSubscribe } from './components/FooterSubscribe/FooterSubscribe';
import { FooterContacts } from './components/FooterContacts/FooterContacts';
import { FooterLogo } from '../icons/FooterLogo';
import './footer.css';
import { ICategory } from '@/common/types';
import { labels } from '@/constants/labels';

interface Props {
  categories: ICategory[];
}

export default function AppFooter({ categories }: Props) {
  console.log('21212', categories);

  return (
    <footer className='xwear-footer'>
      <Container className='xwear-footer__container'>
        <Row gutter={[48, 32]}>
          <FooterColumn
            title={labels.footer.catalog}
            links={[]}
            categories={categories}
            footer={
              <div className='xwear-footer__brand'>
                <FooterLogo />
              </div>
            }
          />

          <FooterColumn
            title={labels.footer.information}
            links={footerInfoLinks as any}
          />

          <FooterColumn
            title={labels.footer.contacts}
            footer={<FooterContacts />}
          />

          <FooterColumn
            title={labels.footer.subscribe}
            footer={<FooterSubscribe />}
          />
        </Row>
      </Container>
    </footer>
  );
}
