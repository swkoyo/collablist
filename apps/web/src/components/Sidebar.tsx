import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

import { classNames } from '~/utils/tailwind';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
];

const Sidebar = () => {
  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4'>
      <div className='flex h-16 shrink-0 items-center'>
        <img
          className='h-8 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=white'
          alt='Your Company'
        />
      </div>
      <nav className='flex flex-1 flex-col'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-indigo-700 text-white'
                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-white'
                          : 'text-indigo-200 group-hover:text-white',
                        'h-6 w-6 shrink-0',
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className='mt-auto'>
            <a
              href='#'
              className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white'
            >
              <Cog6ToothIcon
                className='h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white'
                aria-hidden='true'
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
