import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

import { type RouterOutputs } from '@natodo/api';

import { api } from '~/utils/api';
import { LABEL_COLORS, classNames, getColorCode } from '~/utils/tailwind';

const LabelForm: React.FC<{
  label?: RouterOutputs['label']['all'][number];
  handleCancel: () => void;
  handleSubmit?: () => void;
}> = ({ label, handleCancel, handleSubmit }) => {
  const [labelName, setLabelName] = useState(label?.name || '');
  const [labelColor, setLabelColor] = useState(label?.color || 'gray');
  const utils = api.useContext();

  const { mutate: createLabel, error: createLabelError } =
    api.label.create.useMutation({
      async onSuccess() {
        await utils.label.all.invalidate();
      },
    });

  const { mutate: updateLabel, error: updateLabelError } =
    api.label.update.useMutation({
      async onSuccess() {
        await utils.label.all.invalidate();
      },
    });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (label) {
      updateLabel({
        id: label.id,
        name: labelName,
        color: labelColor,
      });
    } else {
      createLabel({
        name: labelName,
        color: labelColor,
      });
    }

    if (handleSubmit) {
      handleSubmit();
    }
  };

  const resetInput = () => {
    setLabelColor(label?.color || 'gray');
    setLabelName(label?.name || '');
  };

  return (
    <form className='w-full space-y-4 rounded-lg border border-gray-300 px-4 py-4 shadow-sm'>
      <div>
        <label
          htmlFor='label'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Label
        </label>
        <div className='mt-2'>
          <input
            type='text'
            name='label'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            placeholder='Label'
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
          />
        </div>
      </div>
      <Listbox value={labelColor} onChange={setLabelColor}>
        {({ open }) => (
          <>
            <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
              Color
            </Listbox.Label>
            <div className='relative mt-2'>
              <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                <span className='flex items-center'>
                  <span
                    aria-label={labelColor}
                    className={classNames(
                      `bg-${getColorCode(labelColor)}`,
                      'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                    )}
                  />
                  <span className='ml-3 block truncate'>{labelColor}</span>
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {Object.keys(LABEL_COLORS).map((color) => (
                    <Listbox.Option
                      key={color}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-gray-400' : '',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={color}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className='flex items-center'>
                            <span
                              className={classNames(
                                `bg-${getColorCode(color)}`,
                                'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                              )}
                              aria-hidden='true'
                            />
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate',
                              )}
                            >
                              {color}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <div className='flex items-center justify-end space-x-3'>
        <button
          type='button'
          onClick={() => {
            resetInput();
            handleCancel();
          }}
          className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Cancel
        </button>
        <button
          disabled={!labelName}
          type='submit'
          className={`focus-visible:outline-offset-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 ${
            !labelName
              ? 'cursor-not-allowed bg-indigo-300'
              : 'bg-indigo-600 hover:bg-indigo-500'
          }`}
        >
          {label ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default LabelForm;
