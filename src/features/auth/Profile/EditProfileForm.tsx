import { Button, ButtonGroup, FormControl, FormErrorMessage, Input, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getErrorMessage } from '../../../api/helpers';
import { usePutUserMutation } from '../../../api/user';
import useAuth from '../../../hooks/useAuth';
import { IUser } from '../../../types';
import { editUserSchema, EditUserSchema } from './schema';

export default function EditProfileForm({ onClose }: { onClose: () => void }) {
    const auth = useAuth() as IUser;
    const [putUser] = usePutUserMutation();
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<EditUserSchema>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            username: auth.username,
            first_name: auth.first_name,
            last_name: auth.last_name,
            avatar_url: auth.avatar_url || undefined
        }
    });

    const onSubmit = async (data: EditUserSchema) => {
        try {
            await putUser({ ...data, id: auth.id });
            toast({
                title: 'Profile successfully updated!',
                status: 'success',
                duration: 9000,
                isClosable: true
            });
            onClose();
        } catch (err) {
            toast({
                title: 'Failed to update profile',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
                isInvalid={!!errors.username || !!errors.first_name || !!errors.last_name || !!errors.avatar_url}
            >
                <Stack spacing={4}>
                    <Input
                        id='new-username'
                        isInvalid={!!errors.username}
                        placeholder='Username'
                        {...register('username', {
                            required: true
                        })}
                    />
                    <FormErrorMessage>{errors.username?.message as string}</FormErrorMessage>
                    <Input
                        id='new-first-name'
                        isInvalid={!!errors.first_name}
                        placeholder='First name'
                        {...register('first_name', {
                            required: true
                        })}
                    />
                    <FormErrorMessage>{errors.first_name?.message as string}</FormErrorMessage>
                    <Input
                        id='new-last-name'
                        isInvalid={!!errors.last_name}
                        placeholder='Last Name'
                        {...register('last_name', {
                            required: true
                        })}
                    />
                    <FormErrorMessage>{errors.last_name?.message as string}</FormErrorMessage>
                    <Input
                        id='new-avatar-url'
                        isInvalid={!!errors.avatar_url}
                        placeholder='Avatar URL'
                        {...register('avatar_url', {
                            required: false,
                            setValueAs: (v) => (v === '' ? undefined : v)
                        })}
                    />
                    <FormErrorMessage>{errors.avatar_url?.message as string}</FormErrorMessage>
                </Stack>
            </FormControl>
            <ButtonGroup mt={6} width='full'>
                <Button w='full' type='button' onClick={() => onClose()}>
                    Cancel
                </Button>
                <Button w='full' type='submit' isLoading={isSubmitting}>
                    Update
                </Button>
            </ButtonGroup>
        </form>
    );
}
