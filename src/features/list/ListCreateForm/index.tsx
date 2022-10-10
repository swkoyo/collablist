import { Button, FormControl, FormErrorMessage, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
        formState: { errors, isSubmitting }
    } = useForm<CreateListSchema>({
        resolver: zodResolver(createListSchema)
    });

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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize='4xl'>Create New List</Text>
            <FormControl isInvalid={!!errors.title || !!errors.description}>
                <Stack spacing={4}>
                    <Input
                        id='create-list-title'
                        isInvalid={!!errors.title}
                        placeholder='List Title'
                        {...register('title', { required: true })}
                    />
                    <FormErrorMessage>{errors.title?.message as string}</FormErrorMessage>
                    <Input
                        id='create-list-description'
                        isInvalid={!!errors.description}
                        placeholder='List Description'
                        {...register('description', { required: true })}
                    />
                    <FormErrorMessage>{errors.description?.message as string}</FormErrorMessage>
                </Stack>
            </FormControl>
            <Button w='full' type='submit' mt={6} isLoading={isSubmitting}>
                Create List
            </Button>
        </form>
    );
}
