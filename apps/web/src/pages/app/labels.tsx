import { Fragment, type ReactElement } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon, TagIcon } from '@heroicons/react/24/solid';

import { api } from '~/utils/api';
import { classNames, getColorCode } from '~/utils/tailwind';
import Layout from '~/components/Layout';
import { type NextPageWithLayout } from '../_app';

const LabelsPage: NextPageWithLayout = () => {
  const labelsQuery = api.label.all.useQuery();

  return (
    <div className='w-full'>
      <ul role='list' className='divide-y divide-gray-100'>
        {labelsQuery.data?.map((l) => (
          <li key={l.id} className='flex gap-x-6 py-5'>
            <div className='flex items-center'>
              <TagIcon
                className={classNames(
                  `text-${getColorCode(l.color)}`,
                  'h-5 w-5 flex-shrink-0 sm:-ml-1 ',
                )}
                aria-hidden='true'
              />
            </div>
            <div className={classNames('min-w-0 flex-1')}>{l.name}</div>
            <div
              className={classNames(
                'flex flex-none items-center gap-x-4 ui-open:hidden',
              )}
            >
              <Menu as='div' className='relative flex-none'>
                <Menu.Button className='-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900'>
                  <span className='sr-only'>Open options</span>
                  <EllipsisVerticalIcon
                    className='h-5 w-5'
                    aria-hidden='true'
                  />
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
                  <Menu.Items className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                          )}
                        >
                          Edit
                          <span className='sr-only'>, {l.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          // onClick={() =>
                          //   deleteTaskMutation.mutate(t.id)
                          // }
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                          )}
                        >
                          Delete
                          <span className='sr-only'>, {l.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabelsPage;

LabelsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
