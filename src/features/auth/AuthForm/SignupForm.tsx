import { Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignupSchema, signupSchema } from './schema';

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = (values: any) => {
        console.log(errors);
        console.log(values);
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
                <Input
                    id='email'
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
                        id='password'
                        isInvalid={!!errors.password}
                        placeholder='password'
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: true
                        })}
                    />
                    <InputRightElement>
                        <Button type='button' onClick={handleShowPassword}>
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
                    <InputRightElement>
                        <Button type='button' onClick={handleShowPassword}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password_confirmation?.message as string}</FormErrorMessage>
            </FormControl>
            <Button type='submit' mt={4} isLoading={isSubmitting}>
                Signup
            </Button>
        </form>
    );
}
