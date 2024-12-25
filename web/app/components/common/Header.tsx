'use client';

import { headerItems } from '@/app/constants/HeaderItems';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  Button,
} from '@nextui-org/react';
import CustomDropdown from '../ui/CustomDropdown';
import MainLogo from '../icons/MainLogo';
import SearchIcon from '../icons/SearchIcon';
import StarIcon from '../icons/StarIcon';
import UserIcon from '../icons/UserIcon';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar className='bg-headers'>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='md:hidden text-white '
      />
      <NavbarBrand>
        <MainLogo />
      </NavbarBrand>

      <NavbarContent
        className='hidden md:flex lg:flex gap-4'
        justify='start'
      >
        {headerItems.map((item) => (
          <NavbarItem key={item.key}>
            <CustomDropdown category={item} />
          </NavbarItem>
        ))}
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <SearchIcon />
        </NavbarItem>
        <NavbarItem>
          <StarIcon />
        </NavbarItem>
        <NavbarItem>
          <UserIcon />
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
      </NavbarContent>
    </Navbar>
  );
}
