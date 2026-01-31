'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Button, Input, Space } from 'antd';
import {
  MenuOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@/global/store';
import MainLogo from '@/common/components/icons/MainLogo';
import Container from '@/common/components/ui/Container/Container';
import CustomDropdown from '@/common/components/ui/CustomDropdown/CustomDropdown';
import UserDropdown from '@/common/components/user/UserDropdown';
import { ButtonLink } from './button-link/ButtonLink';
import MobileMenuDrawer from './menu-drawer/MobileMenuDrawer';
import { labels } from '@/constants/labels';
import { PageConfig } from '@/constants/pageConfig';
import { fetchCurrentUser } from '@/global/features/auth-slice';
import {
  clearProducts,
  fetchProductsByName,
} from '@/global/features/products-slice';

import type { ICategory } from '@/common/types';

import './header.css';

interface Props {
  categories: ICategory[];
}

export default function AntHeader({ categories }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { Search } = Input;
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(fetchCurrentUser());
    console.log('я отрабатываю');
  }, [dispatch]);

  const { isAuthenticated, status } = useAppSelector((state) => state.auth);

  const isLoading = status === 'idle' || status === 'pending';

  const handleSearch = (value: string) => {
    const v = value.trim();
    if (!v) return;
    dispatch(fetchProductsByName(v));
    router.replace(`/?q=${encodeURIComponent(v)}`);
  };

  const clearSearch = () => {
    router.replace(PageConfig.HOME);
    dispatch(clearProducts());
    dispatch(fetchProductsByName(''));
  };

  const handleMobileSearch = (value: string) => {
    handleSearch(value);
    setIsMobileMenuOpen(false);
  };

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  useEffect(() => {
    if (q.trim().length > 0) handleSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className='header'>
      <Container>
        <div className='inner'>
          <div className='burger-btn'>
            <Button
              type='text'
              className='burger'
              icon={<MenuOutlined />}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label='Open menu'
            />
          </div>

          <Link
            href={PageConfig.HOME}
            className='logo'
            onClick={() => {
              dispatch(clearProducts());
            }}
          >
            <MainLogo />
          </Link>

          <nav className='nav'>
            <Space size='large'>
              {categories.map((cat) => (
                <CustomDropdown
                  key={cat.$id}
                  category={cat}
                />
              ))}
            </Space>
          </nav>

          <Space
            size='small'
            className='actions'
          >
            <div className='search'>
              <Search
                value={searchValue}
                placeholder={labels.placeholders.search}
                allowClear
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchValue(value);

                  if (!value) {
                    clearSearch();
                  }
                }}
                onSearch={(value) => {
                  handleSearch(value);
                }}
              />
            </div>

            {isAuthenticated ? (
              <>
                <ButtonLink
                  href={PageConfig.FAVORITE}
                  icon={<StarOutlined style={{ fontSize: 20 }} />}
                />

                <UserDropdown />

                <ButtonLink
                  href={PageConfig.CART}
                  icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
                />
              </>
            ) : (
              <ButtonLink
                href={PageConfig.LOGIN}
                text={labels.common.login}
                loading={isLoading}
              />
            )}
          </Space>
        </div>
      </Container>

      <MobileMenuDrawer
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        q={q}
        categories={categories}
        onSearch={handleMobileSearch}
        onClearSearch={clearSearch}
        onNavigate={(path) => router.push(path)}
      />
    </header>
  );
}
