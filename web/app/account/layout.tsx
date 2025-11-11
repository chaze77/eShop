'use client';

import { Card, CardBody, Listbox, ListboxItem } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';

const nav = [
  { key: 'account', label: 'Мой аккаунт', href: '/account' },
  { key: 'profile', label: 'Редактировать профиль', href: '/account/profile' },
  { key: 'orders', label: 'Мои заказы', href: '/account/orders' },
  { key: 'password', label: 'Пароль', href: '/account/password' },
  { key: 'logout', label: 'Выход', href: '/login' },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Container className='max-w-[1200px] w-full mx-auto p-6'>
      <h1 className='text-3xl font-extrabold mb-6'>Личный кабинет</h1>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        <div className='lg:col-span-1'>
          <Card>
            <CardBody className='p-0'>
              <Listbox
                aria-label='Навигация кабинета'
                variant='flat'
                selectedKeys={[pathname]}
                selectionMode='single'
              >
                {nav.map((item) => (
                  <ListboxItem
                    key={item.href}
                    className={`px-4 ${
                      pathname === item.href ? 'text-sky-600 font-medium' : ''
                    }`}
                    as={Link}
                    href={item.href}
                  >
                    {item.label}
                  </ListboxItem>
                ))}
              </Listbox>
            </CardBody>
          </Card>
        </div>
        <div className='lg:col-span-3'>{children}</div>
      </div>
    </Container>
  );
}
