'use client';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerButton from '@/layouts/hamburger-button';
import Sidebar from '@/layouts/hydrogen/sidebar';
import Logo from '@/components/moneyMuttImages/moneyMuttLogo.svg';
import HeaderMenuRight from '@/layouts/header-menu-right';
import StickyHeader from '@/layouts/sticky-header';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const closeDrawer = () => {
    console.log('Drawer closed');
  };

  return (
    <StickyHeader className="z-[990] border-b border-l !border-l-greenPrimary-300 border-r-0  border-white dark:border-greenPrimary-300 w-full  items-center justify-between bg-lightgray-100 backdrop-blur-md  py-3 -ml-[1px] pr-4 dark:bg-greenPrimary-secodarydark">

      <div className="flex relative items-center  gap-4 lg:max-w-2xl w-full">
       
        <HamburgerButton
          view={<Sidebar className="static w-full" />}
          className="dark:text-webSecondary"
          hide={false}
        />

        <p className="text-lg">
          {(pathname && pathname === '/dashboard/team') ||
          pathname === '/dashboard/profile-settings/team' ||
          pathname === '/dashboard/profile-settings/billing'
            ? 'Company settings'
            : ''}
        </p>

      </div>

      <div className="px-2  w-full py-2 mb-[1px] rounded-lg hidden md:flex">
        <p className="font-bold text-lg text-greenPrimary-100 dark:text-gray-800">
          Hello, Good morning, Ektaben
        </p>
      </div>

      <div className=' w-full flex justify-end'>
        <HeaderMenuRight />
      </div>
    </StickyHeader>
  );
}
