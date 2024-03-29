import { FC, Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Avatar } from 'antd';
import Company from '../../assets/emtithal.jpeg';

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const MainLayout: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { changeLanguage, language, dir } = i18n;

  const changeLanguagep = (lang: string) => {
    changeLanguage(lang);
    window.location.reload();
  };

  const userNavigation = [
    { name: `${t('TITLE.Logout')}`, href: '/login' },
    { name: `${t('TITLE.profile')}` },
  ];

  const navigation = [
    {
      name: `${t('TITLE.Dashboards')}`,
      href: '/Dashboards',
      icon: HomeIcon,
      current: true,
    },
    {
      name: `${t('TITLE.Templates')}`,
      href: '/templates-list',
      icon: DocumentDuplicateIcon,
      current: false,
    },
    {
      name: `${t('TITLE.MY_Templates')}`,
      href: '/my-templates-list',
      icon: DocumentDuplicateIcon,
      current: false,
    },
    {
      name: `${t('TITLE.Inspections')}`,
      href: '/inspections',
      icon: FolderIcon,
      current: false,
    },
  ];
  const [navItems, setNavItems] = useState(navigation);

  const handleClick = (index: number) => {
    const updatedNavItems = navItems.map((item, i) => {
      if (i === index) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    setNavItems(updatedNavItems);
  };

  useEffect(() => {
    const pathname = location.pathname;
    const updatedNavItems = navItems.map((item) => {
      if (item.href === pathname) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    setNavItems(updatedNavItems);
  }, [location.pathname]);

  useEffect(() => {
    if (language === 'ar') {
      dayjs.locale('ar-sa');
    } else {
      dayjs.locale();
    }
    document.body.dir = dir(language);
  }, [language]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50 lg:hidden'
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'>
                <Dialog.Panel
                  className={`relative ${
                    language === 'ar' ? `` : `mr-16`
                  } flex w-full max-w-xs flex-1`}>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div
                      className={`absolute ${
                        language === 'ar' ? `right-full` : `left-full`
                      }  top-0 flex w-16 justify-center pt-5`}>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5 bg-transparent border-0'
                        onClick={() => setSidebarOpen(false)}>
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4'>
                    <div className='flex h-16 shrink-0 items-center'>
                      <img
                        className='h-8 w-auto'
                        src={Company}
                        alt='Your Company'
                      />
                    </div>
                    <nav className='flex flex-1 flex-col'>
                      <div className='flex flex-1 flex-col gap-y-7'>
                        <div className='mx-2 space-y-1'>
                          {navItems.map((item, index) => (
                            <div key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                                onClick={() => handleClick(index)}>
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? 'text-white'
                                      : 'text-indigo-200 group-hover:text-white',
                                    'h-6 w-6 shrink-0'
                                  )}
                                  aria-hidden='true'
                                />
                                {item.name}
                              </a>
                            </div>
                          ))}
                        </div>
                        <a
                          href='#'
                          className=' mb-4 group mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white'
                          style={{ position: 'absolute', bottom: 0 }}>
                          <Cog6ToothIcon
                            className='h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white'
                            aria-hidden='true'
                          />
                          {`${t('TITLE.SETTING')}`}
                        </a>
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4'>
            <div className='flex h-16 shrink-0 items-center'>
              <img className='h-8 w-auto' src={Company} alt='Your Company' />
            </div>
            <nav className='flex flex-1 flex-col'>
              <div className='flex flex-1 flex-col gap-y-7'>
                <div className='-mx-2 space-y-1'>
                  {navItems.map((item, index) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-700 text-white'
                            : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                        onClick={() => handleClick(index)}>
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-white'
                              : 'text-indigo-200 group-hover:text-white',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
                <a
                  href='#'
                  className=' mb-4 group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white'
                  style={{ position: 'absolute', bottom: 0 }}>
                  <Cog6ToothIcon
                    className='h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white'
                    aria-hidden='true'
                  />
                  {`${t('TITLE.SETTING')}`}
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className={`${language === 'ar' ? `lg:pr-72` : `lg:pl-72`}`}>
          <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
            <button
              type='button'
              className='-m-2.5 p-2.5 bg-transparent border-0 lg:hidden'
              onClick={() => setSidebarOpen(true)}>
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>

            {/* Separator */}
            <div
              className='h-6 w-px bg-gray-900/10 lg:hidden'
              aria-hidden='true'
            />

            <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
              <form className='relative flex flex-1' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  {`${t('search')}`}
                </label>
                <MagnifyingGlassIcon
                  className='pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400'
                  aria-hidden='true'
                />
                <input
                  id='search-field'
                  className='block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                  placeholder='Search...'
                  type='search'
                  name='search'
                />
              </form>
              <div className='flex items-center gap-x-4 lg:gap-x-6'>
                <button
                  type='button'
                  className='-m-2.5 p-2.5 text-gray-400 bg-transparent border-0'>
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                <button
                  type='button'
                  onClick={() => {
                    changeLanguage(language == 'en' ? 'ar' : 'en');
                    window.location.reload();
                  }}
                  className='-m-2.5 p-2.5 text-gray-400 bg-transparent border-0'>
                  <span className='sr-only'>View notifications</span>
                  <LanguageIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Separator */}
                <div
                  className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
                  aria-hidden='true'
                />

                {/* Profile dropdown */}
                <Menu as='div' className='relative'>
                  <Menu.Button className='-m-1.5 flex items-center p-1.5 bg-transparent border-0'>
                    <Avatar size={40} icon={<UserOutlined />} />
                    <span className='hidden lg:flex lg:items-center'>
                      <span
                        className='ml-4 text-sm font-semibold leading-6 text-gray-900'
                        aria-hidden='true'>
                        
                      </span>
                      <ChevronDownIcon
                        className='ml-2 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <>
                              {item.href ? (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                  )}>
                                  {item.name}
                                </a>
                              ) : (
                                <div className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                  {item.name}
                                </div>
                              )}
                            </>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className='py-10'>
            <div className='px-4 sm:px-6 lg:px-8'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
