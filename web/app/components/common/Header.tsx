'use client';

import { headerItems } from '@/app/constants/HeaderItems';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import CustomDropdown from '../ui/CustomDropdown';
import MainLogo from '../icons/MainLogo';

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <MainLogo />
      </NavbarBrand>
      <NavbarContent
        className='hidden sm:flex gap-4'
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
        <NavbarItem className='hidden lg:flex'>
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
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
