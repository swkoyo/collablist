import { Fragment, useEffect, useState, type ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import { api } from '~/utils/api';
import { classNames, getColorCode } from '~/utils/tailwind';
import Layout from '~/components/Layout';
import TaskForm from '~/components/TaskForm';
import { type NextPageWithLayout } from '../_app';

const AppPage: NextPageWithLayout = () => {
  const { data: session, isFetched } = api.auth.getSession.useQuery();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const taskQuery = api.task.all.useQuery(
    // { isDone: false },
    undefined,
    {
      enabled: isAuthenticated,
    },
  );
  const deleteTaskMutation = api.task.delete.useMutation({
    onSettled: () => taskQuery.refetch(),
  });
  const toggleTaskMutation = api.task.toggle.useMutation({
    onSettled: () => taskQuery.refetch(),
  });

  useEffect(() => {
    if (isFetched) {
      if (!session || !session.user) {
        void router.push('/');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [isFetched, session, setIsAuthenticated, router]);

  return (
    <>
      {isAuthenticated && taskQuery.data ? (
        <div className='w-full'>
          <ul role='list' className='divide-y divide-gray-100'>
            {taskQuery.data?.map((t) => (
              <li key={t.id} className='flex gap-x-6 py-5'>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <div
                        className={classNames(
                          open ? 'hidden' : '',
                          'flex items-center',
                        )}
                      >
                        <input
                          id={t.title}
                          name={t.title}
                          type='checkbox'
                          checked={t.isDone}
                          onChange={() => toggleTaskMutation.mutate(t.id)}
                          className='h-4 w-4 rounded border-gray-300 text-pink-400 focus:ring-pink-500'
                        />
                      </div>
                      <div
                        className={classNames(
                          open ? 'hidden' : '',
                          'min-w-0 flex-1',
                        )}
                      >
                        <div className='flex items-start gap-x-3'>
                          <p className='text-sm font-semibold leading-6 text-gray-900'>
                            {t.title}
                          </p>
                          {t.labels.map((l) => (
                            <p
                              key={l.id}
                              className={classNames(
                                `ring-${getColorCode(
                                  l.label.color,
                                )} text-${getColorCode(l.label.color)}`,
                                'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                              )}
                            >
                              {l.label.name}
                            </p>
                          ))}
                        </div>
                        <div className='mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500'>
                          <p className='whitespace-nowrap'>{t.description}</p>
                        </div>
                      </div>
                      <div
                        className={classNames(
                          open ? 'hidden' : '',
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
                                  <Disclosure.Button
                                    as='button'
                                    className={classNames(
                                      active ? 'bg-gray-50' : '',
                                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                                    )}
                                  >
                                    Edit
                                    <span className='sr-only'>, {t.title}</span>
                                  </Disclosure.Button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      deleteTaskMutation.mutate(t.id)
                                    }
                                    className={classNames(
                                      active ? 'bg-gray-50' : '',
                                      'block px-3 py-1 text-sm leading-6 text-gray-900',
                                    )}
                                  >
                                    Delete
                                    <span className='sr-only'>, {t.title}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                      <Disclosure.Panel className='w-full'>
                        {({ close }) => (
                          <TaskForm
                            handleSubmit={close}
                            handleCancel={close}
                            task={t}
                          />
                        )}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </li>
            ))}
            <li className='flex gap-x-6 py-5'>
              <Disclosure>
                <Disclosure.Button className='inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ui-open:hidden'>
                  <PlusCircleIcon
                    className='-ml-0.5 h-5 w-5'
                    aria-hidden='true'
                  />
                  Add task
                </Disclosure.Button>
                <Disclosure.Panel className='w-full'>
                  {({ close }) => <TaskForm handleCancel={close} />}
                </Disclosure.Panel>
              </Disclosure>
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AppPage;

AppPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
