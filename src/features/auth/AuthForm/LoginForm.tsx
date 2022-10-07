import { Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from './schema';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = (values: any) => {
        console.log(errors);
        console.log(values);
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email || !!errors.password}>
                <Input
                    id='email'
                    isInvalid={!!errors.email}
                    placeholder='email'
                    {...register('email', {
                        required: true
                    })}
                />
                <FormErrorMessage>{errors.email?.message as string}</FormErrorMessage>
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
            </FormControl>
            <Button type='submit' mt={4} isLoading={isSubmitting}>
                Login
            </Button>
        </form>
    );
}
