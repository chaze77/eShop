import { Col, Space, Typography } from 'antd';
import Link from 'next/link';
import type { ReactNode } from 'react';
import './footer-column.css';
import type { ICategory } from '@/common/types';
import { PageConfig } from '@/constants/pageConfig';

const { Title } = Typography;

type FooterLink = { label: string; href: string; id: string };

type FooterColumnProps = {
  title: string;
  links?: FooterLink[];
  footer?: ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  categories?: ICategory[];
};

export function FooterColumn({
  title,
  links = [],
  footer,
  xs = 24,
  sm = 12,
  md = 6,
  categories = [],
}: FooterColumnProps) {
  const categoryLinks = categories
    .map((cat) => {
      const href = PageConfig.CATEGORY(encodeURIComponent(cat.$id));
      return { id: cat.$id, label: cat.name, href };
    })
    .filter(
      (l): l is FooterLink => typeof l.href === 'string' && l.href.length > 0,
    );

  const finalLinks = categoryLinks.length > 0 ? categoryLinks : links;

  return (
    <Col
      xs={xs}
      sm={sm}
      md={md}
      className='xwear-footer__column'
    >
      <Title
        level={5}
        className='xwear-footer__title'
        style={{ color: 'white' }}
      >
        {title}
      </Title>

      {finalLinks.length > 0 && (
        <Space
          orientation='vertical'
          size={12}
          style={{ marginBottom: 12 }}
        >
          {finalLinks.map((l) =>
            l.href ? (
              <Link
                key={l.id}
                href={l.href}
                className='xwear-footer__link'
              >
                {l.label}
              </Link>
            ) : (
              <span
                className='xwear-footer__link'
                key={l.id}
              >
                {l.label}
              </span>
            ),
          )}
        </Space>
      )}

      {footer}
    </Col>
  );
}
