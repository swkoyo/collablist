import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    ButtonGroup,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    useDisclosure,
    useOutsideClick,
    useToast,
    VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BsTextLeft } from 'react-icons/bs';
import { getErrorMessage } from '../../../../api/helpers';
import { usePutListMutation } from '../../../../api/list';
import { IList } from '../../../../types';
import ListItemAccordion from './ListItemAccordion';
import { editListSchema, EditListSchema } from './ListItemAccordion/schema';

export default function MainContent({ list }: { list: IList }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref = useRef<HTMLDivElement>(null);
    const [putList] = usePutListMutation();
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid, isDirty },
        reset
    } = useForm<EditListSchema>({
        resolver: zodResolver(editListSchema),
        mode: 'onChange',
        defaultValues: {
            title: list.title,
            description: list.description
        }
    });

    const handleCancel = () => {
        reset();
        onClose();
    };

    useOutsideClick({
        ref,
        handler: () => handleCancel()
    });

    const onSubmit = async (data: EditListSchema) => {
        try {
            await putList({ id: list.id, ...data }).unwrap();
            reset({ title: data.title, description: data.description });
            onClose();
        } catch (err) {
            toast({
                title: 'Failed to edit list',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            onClose();
        }
    };

    const handleFormEscape = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            handleCancel();
        }
    };

    return (
        <Box width='75%' pr={3}>
            <VStack
                ref={ref}
                border={isOpen ? '1px' : 'none'}
                borderRadius='10px'
                align='start'
                p={2}
                onKeyDown={handleFormEscape}
            >
                <Box as='form' onSubmit={handleSubmit(onSubmit)} width='full'>
                    <Input
                        fontWeight='bold'
                        fontSize='2xl'
                        variant='unstyled'
                        isInvalid={!isDirty && !!errors.title}
                        cursor='text'
                        mb={4}
                        onClick={() => (!isOpen ? onOpen() : null)}
                        {...register('title', { required: true })}
                    />
                    <InputGroup pl={4} variant='unstyled' alignItems='center' gap={2} size='md'>
                        <InputLeftAddon pointerEvents='none'>
                            <BsTextLeft />
                        </InputLeftAddon>
                        <Input
                            onClick={() => (!isOpen ? onOpen() : null)}
                            isInvalid={!isDirty && !!errors.description}
                            {...register('description', { required: true })}
                            cursor='text'
                        />
                    </InputGroup>
                    {isOpen && (
                        <ButtonGroup width='full' size='xs'>
                            <Box flex='1' />
                            <IconButton
                                aria-label='Cancel list edit'
                                type='button'
                                onClick={() => handleCancel()}
                                icon={<CloseIcon />}
                            />
                            <IconButton
                                aria-label={`confirm-list-${list.id}-edit`}
                                icon={<CheckIcon />}
                                type='submit'
                                isDisabled={!isValid}
                                isLoading={isSubmitting}
                            />
                        </ButtonGroup>
                    )}
                </Box>
            </VStack>
            <ListItemAccordion list={list} />
        </Box>
    );
}