import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';

import { api } from '~/utils/api';
import { classNames } from '~/utils/tailwind';

const Navbar: React.FC<{
  openSidebar: () => void;
}> = ({ openSidebar }) => {
  const { data: session } = api.auth.getSession.useQuery();

  return (
    <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
      <button
        type='button'
        className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
        onClick={() => openSidebar()}
      >
        <span className='sr-only'>Open sidebar</span>
        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
      </button>

      <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
        <div className='ml-auto flex items-center gap-x-4 lg:gap-x-6'>
          {/* Profile dropdown */}
          <Menu as='div' className='relative'>
            <Menu.Button className='-m-1.5 flex items-center p-1.5'>
              <span className='sr-only'>Open user menu</span>
              {session?.user?.image ? (
                <img
                  className='h-8 w-8 rounded-full bg-gray-50'
                  src={session.user.image}
                  alt=''
                />
              ) : (
                <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500'>
                  <span className='text-sm leading-none text-white'>
                    {session?.user.name ? session.user.name[0] : 'U'}
                  </span>
                </span>
              )}
              <span className='hidden lg:flex lg:items-center'>
                <span
                  className='ml-4 text-sm font-semibold leading-6 text-gray-900'
                  aria-hidden='true'
                >
                  {session?.user.name}
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
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => void signOut({ callbackUrl: '/' })}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block w-full px-3 py-1 text-start text-sm leading-6 text-gray-900',
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
