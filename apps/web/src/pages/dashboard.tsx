import React, { Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Disclosure, Listbox, Transition } from '@headlessui/react';
import { PlusCircleIcon, TagIcon } from '@heroicons/react/20/solid';

import { api, type RouterOutputs } from '~/utils/api';
import Navbar from '~/components/Navbar';

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const Dashboard: NextPage = () => {
  const { data: session, isFetched } = api.auth.getSession.useQuery();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const taskQuery = api.task.all.useQuery(undefined, {
    enabled: isAuthenticated,
  });
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
      <Navbar />
      <main className='flex h-screen flex-col items-center bg-gray-800 text-white'>
        <div className='container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8'>
          {isAuthenticated && taskQuery.data ? (
            <div className='w-full max-w-2xl'>
              {taskQuery.data?.length === 0 ? (
                <span>There are no tasks!</span>
              ) : (
                <div className='flex h-[40vh] justify-center px-4 text-2xl'>
                  <div className='flex w-full flex-col gap-4'>
                    {taskQuery.data?.map((t) => {
                      return (
                        <TaskCard
                          key={t.id}
                          task={t}
                          onTaskDelete={() => deleteTaskMutation.mutate(t.id)}
                          onTaskToggle={() => toggleTaskMutation.mutate(t.id)}
                        />
                      );
                    })}
                    <CreateTaskForm />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Dashboard;

const TaskCard: React.FC<{
  task: RouterOutputs['task']['all'][number];
  onTaskDelete?: () => void;
  onTaskToggle?: () => void;
}> = ({ task, onTaskDelete, onTaskToggle }) => {
  return (
    <div className='relative flex items-start'>
      <div className='flex h-6 items-center'>
        <input
          id={task.title}
          name={task.title}
          type='checkbox'
          checked={task.isDone}
          onChange={onTaskToggle}
          className='h-4 w-4 rounded border-gray-300 text-pink-400 focus:ring-pink-500'
        />
      </div>
      <div className='ml-3 flex-1 text-sm leading-6'>
        <label htmlFor={task.title} className='font-medium text-pink-400'>
          {task.title}
        </label>
        <p id={`${task.title}-description`} className='text-pink-400'>
          {task.description}
        </p>
      </div>
      <div className='flex h-6 items-center'>
        <span
          className='cursor-pointer text-sm font-bold uppercase text-pink-400'
          onClick={onTaskDelete}
        >
          Delete
        </span>
      </div>
    </div>
  );
};

const CreateTaskForm: React.FC = () => {
  const utils = api.useContext();
  const labels = api.label.all.useQuery();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, error } = api.task.create.useMutation({
    async onSuccess() {
      resetInput();
      await utils.task.all.invalidate();
    },
  });

  const resetInput = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <Disclosure>
      <Disclosure.Button className='inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ui-open:hidden'>
        <PlusCircleIcon className='-ml-0.5 h-5 w-5' aria-hidden='true' />
        Add task
      </Disclosure.Button>
      <Disclosure.Panel
        as='form'
        className='relative'
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ title, description });
        }}
      >
        {({ close }) => (
          <>
            <div className='overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
              <label htmlFor='title' className='sr-only'>
                Task
              </label>
              <input
                type='text'
                name='task'
                id='task'
                className='block w-full border-0 pt-2.5 text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:ring-0'
                placeholder='Task'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor='description' className='sr-only'>
                Description
              </label>
              <textarea
                rows={2}
                name='description'
                id='description'
                className='block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div aria-hidden='true' className='bg-white'>
                <div className='py-2'>
                  <div className='h-9' />
                </div>
                <div className='h-px' />
                <div className='py-2'>
                  <div className='py-px'>
                    <div className='h-9' />
                  </div>
                </div>
              </div>
            </div>
            <div className='absolute inset-x-px bottom-0'>
              <div className='flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3'>
                <Listbox as='div' className='flex-shrink-0'>
                  {({ open }) => (
                    <>
                      <Listbox.Label className='sr-only'>
                        Add a label
                      </Listbox.Label>
                      <div className='relative'>
                        <Listbox.Button className='relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3'>
                          <TagIcon
                            className='h-5 w-5 flex-shrink-0 text-gray-300 sm:-ml-1'
                            aria-hidden='true'
                          />
                          <span className='hidden truncate text-gray-900 sm:ml-2 sm:block'>
                            Label
                          </span>
                        </Listbox.Button>
                        <Transition
                          show={open}
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Listbox.Options className='absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-black shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                            {labels.data?.map((label) => (
                              <Listbox.Option
                                key={label.name}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-100' : 'bg-white',
                                    'relative cursor-default select-none px-3 py-2',
                                  )
                                }
                                value={label}
                              >
                                <div className='flex items-center'>
                                  <span className='block truncate font-medium'>
                                    {label.name}
                                  </span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
              <div className='flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3'>
                <Disclosure.Button
                  as='button'
                  onClick={() => {
                    resetInput();
                    close;
                  }}
                  className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Cancel
                </Disclosure.Button>
                <button
                  disabled={!title}
                  type='submit'
                  className={`focus-visible:outline-offset-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                    !title
                      ? 'cursor-not-allowed bg-indigo-300'
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                >
                  Create
                </button>
              </div>
            </div>
          </>
        )}
      </Disclosure.Panel>
    </Disclosure>
  );
};
