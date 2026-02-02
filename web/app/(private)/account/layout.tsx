'use client';

import { Card, Menu, Row, Col, Typography } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/common/components/ui/Container/Container';
import { labels } from '@/constants/labels';
import { useAppDispatch } from '@/global/store';
import { logoutThunk } from '@/global/features/auth-slice';

const { Title } = Typography;

const nav = [
  { key: '/account', label: labels.fields.userAccount },
  { key: '/account/profile', label: labels.account.editAccount },

  { key: '/account/password', label: labels.account.editPassword },
  { key: '/logout', label: labels.common.logout },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
    } catch (err) {
      console.error('logout упал', err);
    }
  };

  return (
    <Container>
      <Title level={2}>{labels.fields.userAccount}</Title>

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
              onClick={({ key }) => {
                if (key === '/logout') handleLogout();
              }}
              items={nav.map((item) => ({
                key: item.key,
                label:
                  item.key === '/logout' ? (
                    <span style={{ cursor: 'pointer' }}>{item.label}</span>
                  ) : (
                    <Link href={item.key}>{item.label}</Link>
                  ),
              }))}
            />
          </Card>
        </Col>

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
