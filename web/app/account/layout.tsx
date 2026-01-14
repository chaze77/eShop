'use client';

import { Card, Menu, Row, Col, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/common/components/ui/Container/Container';

const { Title } = Typography;

const nav = [
  { key: '/account', label: 'my account' },
  { key: '/account/profile', label: 'edit profile' },

  { key: '/account/password', label: 'password' },
  { key: '/login', label: 'Выход' },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Container>
      <Title level={2}>Личный кабинет</Title>

      <Row gutter={24}>
        {/* Левая колонка */}
        <Col
          xs={24}
          lg={6}
        >
          <Card>
            <Menu
              mode='inline'
              selectedKeys={[pathname]}
              items={nav.map((item) => ({
                key: item.key,
                label: <Link href={item.key}>{item.label}</Link>,
              }))}
            />
          </Card>
        </Col>

        {/* Правая колонка */}
        <Col
          xs={24}
          lg={18}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
}
