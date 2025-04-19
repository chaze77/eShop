'use client';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import CustomDropdown from '../ui/CustomDropdown';
import MainLogo from '../icons/MainLogo';
import SearchIcon from '../icons/SearchIcon';
import StarIcon from '../icons/StarIcon';
import UserIcon from '../icons/UserIcon';
import { useState } from 'react';
import CustomAccordion from '../ui/CustomAccordion';
import { ICategory } from '@/types';

export default function Header({ categories }: { categories: ICategory[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar className='bg-headers'>
      <NavbarContent>
        <NavbarItem className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 xs:static xs:left-auto xs:top-auto xs:transform-none order-2 xs:order-1 px-6'>
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
        <NavbarMenu className='bg-black'>
          {categories.map((item, index) => (
            <NavbarMenuItem key={item.$id}>
              <CustomAccordion category={item.name} />
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
