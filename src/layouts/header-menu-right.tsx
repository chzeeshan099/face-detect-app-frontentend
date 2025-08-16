
import { TbLogout } from 'react-icons/tb';
import SelectCountry from '@/components/select-country/select-country';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import localStorageService from '@/utils/localStorage';

export default function HeaderMenuRight() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const THEME_KEY = 'mode';
  useEffect(() => {
    setMounted(true);
    const themeMode: any = localStorageService.getItem(THEME_KEY);
    if (!themeMode) {
      setTheme('dark');
    } else {
      setTheme(themeMode);
    }
  }, []);

  const toggleTheme = () => {
    const themelocal =  theme === 'dark' ? 'light' : 'dark'
    setTheme(themelocal);
    localStorageService.setItem(THEME_KEY, themelocal);

  };


  return (
    <div className="ms-auto flex items-center gap-2 xs:gap-3 xl:gap-4">
      <div className="flex w-auto cursor-pointer items-center">
        {mounted && (
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="transition-colors duration-300 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-200"
          >
            {theme === 'dark' ? (
              <FiSun className="h-5 w-5 text-yellow-400" />
            ) : (
              <FiMoon className="h-5 w-5 text-gray-800" />
            )}
          </button>
        )}
      </div>

      <div className="flex cursor-pointer items-center  text-gray-800 dark:text-gray-800">
        <IoNotificationsOutline className="h-5 w-5" />
      </div>

      <div className="flex cursor-pointer items-center">
        <SelectCountry />
      </div>

      <div className="flex w-full cursor-pointer  items-center gap-x-2 text-gray-800 dark:text-white ">
        <TbLogout className="h-5 w-5" />
        <p className='sm:block hidden'>Logout</p>
      </div>

      {/* Profile Menu (Optional) */}
      {/* <ProfileMenu /> */}
    </div>
  );
}
