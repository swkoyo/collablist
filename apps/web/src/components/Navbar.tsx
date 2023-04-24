import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import { signOut } from 'next-auth/react';

import { api } from '~/utils/api';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { data: session } = api.auth.getSession.useQuery();

  return (
    <nav>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 justify-between'>
          <div className='flex'>
            <div className='flex flex-shrink-0 items-center'>
              <h1 className='text-3xl font-extrabold tracking-tight'>natodo</h1>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <button
                type='button'
                className='relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                <PlusIcon className='-ml-0.5 h-5 w-5' aria-hidden='true' />
                New Task
              </button>
            </div>
            <div className='md:ml-4 md:flex md:flex-shrink-0 md:items-center'>
              <Menu as='div' className='relative ml-3'>
                <div>
                  <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                    <span className='sr-only'>Open user menu</span>
                    {session?.user?.image ? (
                      <img
                        className='inline-block h-10 w-10 rounded-full'
                        src={session.user.image}
                        alt=''
                      />
                    ) : (
                      <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500'>
                        <span className='font-medium leading-none text-white'>
                          {session?.user.name ? session.user.name[0] : 'U'}
                        </span>
                      </span>
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => void signOut({ callbackUrl: '/' })}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
