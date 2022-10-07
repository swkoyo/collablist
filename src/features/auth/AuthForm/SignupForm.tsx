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
import { useSignupMutation } from '../../../api/auth';
import { getErrorMessage } from '../../../api/helpers';
import { SignupSchema, signupSchema } from './schema';

export default function SignupForm({ handleTabChange }: { handleTabChange: (index: number) => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const [postSignup] = useSignupMutation();
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async (data: SignupSchema) => {
        try {
            await postSignup(data).unwrap();
            handleTabChange(0);
            toast({
                title: 'Signup successful!',
                status: 'success',
                duration: 9000,
                isClosable: true
            });
        } catch (err) {
            toast({
                title: 'Failed to signup',
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
            <FormControl
                isInvalid={
                    !!errors.email ||
                    !!errors.password ||
                    !!errors.password_confirmation ||
                    !!errors.first_name ||
                    !!errors.last_name
                }
            >
                <Stack spacing={4}>
                    <Input
                        id='signup-email'
                        isInvalid={!!errors.email}
                        placeholder='Email'
                        {...register('email', {
                            required: true
                        })}
                    />
                    <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
                    <Input
                        id='first_name'
                        isInvalid={!!errors.first_name}
                        placeholder='First Name'
                        {...register('first_name', {
                            required: true
                        })}
                    />
                    <FormErrorMessage>{errors.first_name?.message as string}</FormErrorMessage>
                    <Input
                        id='last_name'
                        isInvalid={!!errors.last_name}
                        placeholder='Last name'
                        {...register('last_name', {
                            required: true
                        })}
                    />
                    <FormErrorMessage>{errors.last_name?.message as string}</FormErrorMessage>
                    <InputGroup>
                        <Input
                            id='signup-password'
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
                    <InputGroup>
                        <Input
                            id='password_confirmation'
                            isInvalid={!!errors.password_confirmation}
                            placeholder='Confirm Password'
                            type={showPassword ? 'text' : 'password'}
                            {...register('password_confirmation', {
                                required: true
                            })}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' type='button' onClick={handleShowPassword}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password_confirmation?.message as string}</FormErrorMessage>
                </Stack>
            </FormControl>
            <Button w='full' type='submit' mt={6} isLoading={isSubmitting}>
                Signup
            </Button>
        </form>
    );
}
