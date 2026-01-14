'use client';

import { Layout, Menu, Button, Input, Space, Flex } from 'antd';
import { StarOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect } from 'react';

import MainLogo from '@/common/components/icons/MainLogo';
import CustomDropdown from '@/common/components/ui/CustomDropdown/CustomDropdown';
import UserDropdown from '@/common/components/user/UserDropdown';

import { ICategory } from '@/common/types';
import { useAppDispatch, useAppSelector } from '@/global/store';
import {
  clearProducts,
  fetchProductsByName,
} from '@/global/features/products-slice';
import './Header.scss';
import { PageConfig } from '@/constants/pageConfig';
import { fetchCurrentUser } from '@/global/features/auth-slice';

const { Header } = Layout;
const { Search } = Input;

interface Props {
  categories: ICategory[];
}

export default function AntHeader({ categories }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  console.log(isAuthenticated, 'isAuthenticated in Header');

  const handleSearch = (value: string) => {
    if (!value) return;
    dispatch(fetchProductsByName(value));
    router.replace(`/?q=${encodeURIComponent(value)}`);
  };

  const clearSearch = () => {
    router.replace(PageConfig.HOME);
    dispatch(clearProducts());
  };

  const handleBackToMain = () => {
    dispatch(clearProducts());
    router.push(PageConfig.HOME);
  };

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  useEffect(() => {
    if (q.length > 0) handleSearch(q.trim());
  }, []);

  return (
    <Header className='header'>
      <Flex
        justify='space-between'
        align='center'
        className='header__inner'
      >
        <div onClick={handleBackToMain}>
          <MainLogo />
        </div>

        <Space size='middle'>
          <Menu
            mode='horizontal'
            theme='dark'
            selectable={false}
            items={categories.map((cat) => ({
              key: cat.$id,
              label: <CustomDropdown category={cat} />,
            }))}
          />
        </Space>

        <Space
          size='middle'
          className='header__actions'
        >
          <Search
            defaultValue={q}
            placeholder='Поиск товаров'
            onSearch={handleSearch}
            onChange={clearSearch}
            allowClear
            className='header__search'
          />

          {isAuthenticated && (
            <Button
              type='text'
              icon={<StarOutlined />}
              className='header__icon-button'
              onClick={() => router.push(PageConfig.FAVORITE)}
            />
          )}

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <Button
              type='primary'
              onClick={() => router.push(PageConfig.LOGIN)}
            >
              Login
            </Button>
          )}

          {isAuthenticated && (
            <Button
              type='text'
              icon={<ShoppingCartOutlined />}
              className='header__icon-button'
              onClick={() => router.push(PageConfig.CART)}
            />
          )}
        </Space>
      </Flex>
    </Header>
  );
}
