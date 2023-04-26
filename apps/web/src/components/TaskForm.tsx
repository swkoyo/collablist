import React, { useState } from 'react';

import { type RouterOutputs } from '@natodo/api';

import { api } from '~/utils/api';

const TaskForm: React.FC<{
  task?: RouterOutputs['task']['all'][number];
  handleCancel: () => void;
  handleSubmit?: () => void;
}> = ({ task, handleCancel, handleSubmit }) => {
  const utils = api.useContext();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const { mutate: createTask, error: createTaskError } =
    api.task.create.useMutation({
      async onSuccess() {
        resetInput();
        await utils.task.all.invalidate();
      },
    });

  const { mutate: updateTask, error: createUpdateError } =
    api.task.update.useMutation({
      async onSuccess() {
        resetInput();
        await utils.task.all.invalidate();
      },
    });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      updateTask({ id: task.id, title, description });
    } else {
      createTask({ title, description });
    }
    if (handleSubmit) {
      handleSubmit();
    }
  };

  const resetInput = () => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
  };

  return (
    <form className='relative' onSubmit={handleFormSubmit}>
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
        {/* <div className='flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3'>
                <Listbox
                  as='div'
                  className='flex-shrink-0'
                  value={selectedLabel}
                  onChange={setSelectedLabel}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Label className='sr-only'>
                        Add a label
                      </Listbox.Label>
                      <div className='relative'>
                        <Listbox.Button className='relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3'>
                          <TagIcon
                            className={classNames(
                              !selectedLabel
                                ? 'text-gray-300'
                                : 'text-gray-500',
                              'h-5 w-5 flex-shrink-0 sm:-ml-1',
                            )}
                            aria-hidden='true'
                          />
                          <span
                            className={classNames(
                              !selectedLabel ? '' : 'text-gray-900',
                              'hidden truncate sm:ml-2 sm:block',
                            )}
                          >
                            {selectedLabel ? selectedLabel.name : 'Label'}
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
              </div> */}
        <div className='flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3'>
          <button
            onClick={() => {
              resetInput();
              handleCancel();
            }}
            className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Cancel
          </button>
          <button
            disabled={!title}
            type='submit'
            className={`focus-visible:outline-offset-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 ${
              !title
                ? 'cursor-not-allowed bg-indigo-300'
                : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
          >
            {task ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
