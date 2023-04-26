import Link from 'next/link';
import { useRouter } from 'next/router';
import { HomeIcon, TagIcon } from '@heroicons/react/24/outline';

import { classNames } from '~/utils/tailwind';

const navigation = [
  { name: 'Home', href: '/app', icon: HomeIcon },
  { name: 'Labels', href: '/app/labels', icon: TagIcon },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4'>
      <div className='flex h-16 shrink-0 items-center text-2xl font-bold text-white'>
        <span>na</span>todo
      </div>
      <nav className='flex flex-1 flex-col'>
        <ul role='list' className='flex flex-1 flex-col gap-y-7'>
          <li>
            <ul role='list' className='-mx-2 space-y-1'>
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      router.pathname === item.href
                        ? 'bg-indigo-700 text-white'
                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        router.pathname === item.href
                          ? 'text-white'
                          : 'text-indigo-200 group-hover:text-white',
                        'h-6 w-6 shrink-0',
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
