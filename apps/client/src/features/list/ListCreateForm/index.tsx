import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isArray } from 'lodash';
import { KeyboardEvent } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { getErrorMessage } from '../../../api/helpers';
import { usePostListMutation } from '../../../api/list';
import { useAppDispatch } from '../../../hooks/redux';
import { hideModal } from '../../modal/modalSlice';
import { createListSchema, CreateListSchema } from './schema';

export default function ListCreateForm() {
    const dispatch = useAppDispatch();
    const toast = useToast();
    const [postList] = usePostListMutation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid },
        control
    } = useForm<CreateListSchema>({
        resolver: zodResolver(createListSchema),
        defaultValues: {
            items: [{ title: '' }]
        },
        mode: 'onChange'
    });

    const { fields, append, remove } = useFieldArray({ name: 'items', control });

    const onSubmit = async (data: CreateListSchema) => {
        try {
            await postList(data).unwrap();
            dispatch(hideModal());
            toast({
                title: 'Successfully created new list!',
                status: 'success',
                duration: 9000,
                isClosable: true
            });
        } catch (err) {
            toast({
                title: 'Failed to create list',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    const handleItemEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            append({ title: '' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize='4xl'>Create New List</Text>
            <FormControl
                isInvalid={
                    !!errors.title ||
                    !!errors.description ||
                    (isArray(errors.items) && errors.items.some((i) => i?.title))
                }
            >
                <Stack spacing={4}>
                    <Input
                        id='create-list-title'
                        isInvalid={!!errors.title}
                        placeholder='List Title'
                        {...register('title', { required: true })}
                    />
                    <FormErrorMessage hidden={!errors.title}>{errors.title?.message as string}</FormErrorMessage>
                    <Input
                        id='create-list-description'
                        isInvalid={!!errors.description}
                        placeholder='List Description'
                        {...register('description', { required: true })}
                    />
                    <FormErrorMessage hidden={!errors.description}>
                        {errors.description?.message as string}
                    </FormErrorMessage>
                    {fields.map((item, index) => {
                        return (
                            <VStack align='start' key={index}>
                                <InputGroup
                                    onKeyDown={(e) =>
                                        isArray(errors.items) && errors.items[index] && errors.items[index].title
                                            ? null
                                            : handleItemEnter(e)
                                    }
                                >
                                    <Input
                                        pr='4.5rem'
                                        type='text'
                                        placeholder='Add item'
                                        key={item.title}
                                        isInvalid={
                                            isArray(errors.items) && errors.items[index] && errors.items[index].title
                                        }
                                        defaultValue={item.title}
                                        {...register(`items.${index}.title` as const, { required: true })}
                                        autoComplete='off'
                                    />
                                    <InputRightElement width='6rem' gap={2}>
                                        <IconButton
                                            aria-label='Add item'
                                            h='1.75rem'
                                            size='sm'
                                            icon={<MinusIcon />}
                                            disabled={fields.length === 1}
                                            onClick={() => remove(index)}
                                        />
                                        <IconButton
                                            aria-label='Add item'
                                            h='1.75rem'
                                            size='sm'
                                            icon={<AddIcon />}
                                            disabled={
                                                isArray(errors.items) &&
                                                errors.items[index] &&
                                                errors.items[index].title
                                            }
                                            onClick={() => append({ title: '' })}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {isArray(errors.items) && errors.items[index] && errors.items[index].title
                                        ? (errors.items[index].title.message as string)
                                        : null}
                                </FormErrorMessage>
                            </VStack>
                        );
                    })}
                </Stack>
            </FormControl>
            <Button w='full' type='submit' mt={6} isLoading={isSubmitting} disabled={!isValid}>
                Create List
            </Button>
        </form>
    );
}
