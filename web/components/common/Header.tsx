'use client';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@nextui-org/react';
import CustomDropdown from '../ui/CustomDropdown';
import MainLogo from '../icons/MainLogo';
import StarIcon from '../icons/StarIcon';
import UserIcon from '../icons/UserIcon';
import { useEffect, useState } from 'react';
import { ICategory } from '@/types';
import { notFound, useRouter } from 'next/navigation';
import SearchInput from '../ui/SearchInput';
import CustomAccordion from '../ui/CustomAccordion';
import { useAppDispatch, useAppSelector } from '@/global/store';
import {
  clearProducts,
  fetchProductsByName,
} from '@/global/features/products-slice';

import {
  getCurrentUserThunk,
  logoutThunk,
  selectUser,
} from '@/global/features/auth-slice';
import UserDropdown from '../user/UserDropdown';
import { div } from 'framer-motion/client';
import { logout } from '../../common/lib/auth';
import LogoutModal from '../user/LogoutModal';
import LoginIcon from '../icons/LoginIcon';

export default function Header({ categories }: { categories: ICategory[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const [currentUser, setCurrentUser] = useState<any>('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    async function checkUser() {
      const res = await dispatch(getCurrentUserThunk());
    }
    checkUser();
  }, []);

  const handleSearch = (value: string) => {
    if (!value) return;
    dispatch(fetchProductsByName(value));
    router.replace(value ? `/?q=${encodeURIComponent(value)}` : '/');
  };

  const handleBackToMain = () => {
    dispatch(clearProducts());
    router.push('/');
  };

  const handleToFavirites = () => {
    router.push('/favorites');
  };

  const handleGoSignIn = () => {
    router.push('/login/');
  };

  if (!categories.length) {
    return null;
  }

  console.log('currentUser', user);

  if (status === 'pending') return <div>Загрузка</div>;

  return (
    <Navbar className='bg-headers'>
      <NavbarContent>
        <NavbarItem
          className='cursor-pointer absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 xs:static xs:left-auto xs:top-auto xs:transform-none order-2 xs:order-1 px-6'
          onClick={handleBackToMain}
        >
          <MainLogo />
        </NavbarItem>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='order-1 xs:order-2 md:hidden text-white px-6'
        />
      </NavbarContent>
      <NavbarContent
        className='hidden md:flex lg:flex gap-4'
        justify='start'
      >
        {categories.map((item) => (
          <NavbarItem key={item.$id}>
            <CustomDropdown category={item} />
          </NavbarItem>
        ))}
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='absolute xs:static left-20'>
          <SearchInput onSearch={handleSearch} />
        </NavbarItem>
        <NavbarItem
          onClick={handleToFavirites}
          className='cursor-pointer'
        >
          <StarIcon
            filled={false}
            className='text-white'
          />
        </NavbarItem>

        <NavbarItem>
          {user ? (
            <div>
              <UserDropdown user={user} />{' '}
              <span className='text-white'>{user.name}</span>
            </div>
          ) : (
            <div onClick={handleGoSignIn}>
              <LoginIcon />
            </div>
          )}
        </NavbarItem>
        {/* <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color='primary'
            href='#'
            variant='flat'
          >
            Sign Up
          </Button>
        </NavbarItem> */}
        <NavbarMenu className='bg-black'>
          {categories.map((item) => (
            <NavbarMenuItem key={item.$id}>
              <CustomAccordion category={item} />
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
