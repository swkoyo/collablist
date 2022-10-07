import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useToast
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../../api/auth';
import { getErrorMessage } from '../../../api/helpers';
import { useAppDispatch } from '../../../hooks/redux';
import { hideModal } from '../../modal/modalSlice';
import { setCredentials } from '../authSlice';
import { LoginSchema, loginSchema } from './schema';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const [postLogin] = useLoginMutation();
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            const { user, token } = await postLogin(data).unwrap();
            localStorage.setItem('token', token);
            dispatch(setCredentials({ user, token }));
            dispatch(hideModal());
            toast({
                title: `Welcome back ${user.first_name}!`,
                status: 'success',
                duration: 9000,
                isClosable: true
            });
        } catch (err) {
            toast({
                title: 'Failed to login',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email || !!errors.password}>
                <Stack spacing={4}>
                    <Input
                        id='login-email'
                        isInvalid={!!errors.email}
                        placeholder='Email'
                        {...register('email', {
                            required: true
                        })}
                    />
                    <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
                    <InputGroup>
                        <Input
                            id='login-password'
                            isInvalid={!!errors.password}
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: true
                            })}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' type='button' onClick={handleShowPassword}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage>
                </Stack>
            </FormControl>
            <Button w='full' type='submit' mt={6} isLoading={isSubmitting}>
                Login
            </Button>
        </form>
    );
}
