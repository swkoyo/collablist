import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    CloseButton,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignupMutation } from '../../../api/auth';
import { getErrorMessage } from '../../../api/helpers';
import { SignupSchema, signupSchema } from './schema';
import SignupPasswordCheck from './SignupPasswordCheck';

export default function SignupForm({ handleTabChange }: { handleTabChange: (index: number) => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const [postSignup] = useSignupMutation();
    const toast = useToast();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid, touchedFields },
        watch
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange'
    });

    const passwordWatch = watch('password');

    const showSubmit = () => {
        return (
            touchedFields.email &&
            touchedFields.first_name &&
            touchedFields.last_name &&
            passwordWatch &&
            !errors.email &&
            !errors.first_name &&
            !errors.last_name &&
            !errors.password
        );
    };

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
        <VStack as='form' onSubmit={handleSubmit(onSubmit)} spacing={4}>
            {isOpen && (
                <Alert status='warning'>
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Signup is disabled</AlertTitle>
                        <AlertDescription>
                            You may complete the form to demo the signup process. However, signup is disabled at this
                            time.
                        </AlertDescription>
                    </Box>
                    <CloseButton alignSelf='flex-start' position='relative' right={-1} top={-1} onClick={onClose} />
                </Alert>
            )}
            <FormControl isInvalid={!!errors.email}>
                <FormLabel fontSize='sm'>Email</FormLabel>
                <Input
                    id='signup-email'
                    isInvalid={!!errors.email}
                    placeholder='Email'
                    variant='filled'
                    type='email'
                    {...register('email', {
                        required: true
                    })}
                    autoFocus
                />
                {errors.email && <FormErrorMessage fontSize='xs'>{errors.email?.message as string}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.first_name || !!errors.last_name}>
                <HStack>
                    <FormControl isInvalid={!!errors.first_name}>
                        <FormLabel fontSize='sm'>First name</FormLabel>
                        <Input
                            id='first_name'
                            isInvalid={!!errors.first_name}
                            placeholder='First Name'
                            variant='filled'
                            {...register('first_name', {
                                required: true
                            })}
                        />
                    </FormControl>
                    <FormControl isInvalid={!!errors.last_name}>
                        <FormLabel fontSize='sm'>Last name</FormLabel>
                        <Input
                            id='last_name'
                            isInvalid={!!errors.last_name}
                            placeholder='Last name'
                            variant='filled'
                            {...register('last_name', {
                                required: true
                            })}
                        />
                    </FormControl>
                </HStack>
                {(!!errors.first_name || !!errors.last_name) && (
                    <FormErrorMessage>
                        {(errors.first_name?.message as string) || (errors.last_name?.message as string)}
                    </FormErrorMessage>
                )}
            </FormControl>
            <VStack w='full'>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel fontSize='sm'>Password</FormLabel>
                    <InputGroup>
                        <Input
                            id='signup-password'
                            isInvalid={!!errors.password}
                            placeholder='Password'
                            variant='filled'
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
                </FormControl>
                <SignupPasswordCheck password={passwordWatch} />
            </VStack>
            {showSubmit() && (
                <>
                    <FormControl isInvalid={!!errors.password_confirmation}>
                        <FormLabel fontSize='sm'>Confirm your password</FormLabel>

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
                        {!!errors.password_confirmation && (
                            <FormErrorMessage>{errors.password_confirmation?.message as string}</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button
                        w='full'
                        type='submit'
                        colorScheme='green'
                        mt={6}
                        isLoading={isSubmitting}
                        isDisabled={!isValid}
                    >
                        Signup
                    </Button>
                </>
            )}
        </VStack>
    );
}
