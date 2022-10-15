import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    Input,
    useDisclosure,
    useOutsideClick,
    useToast
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { getErrorMessage } from '../../../../../api/helpers';
import { usePostListItemMutation } from '../../../../../api/list';
import { IList } from '../../../../../types';
import { createListItemSchema, CreateListItemSchema } from './schema';

export default function AddItemForm({ list }: { list: IList }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref = useRef<HTMLFormElement>(null);
    const toast = useToast();
    const [postListItem] = usePostListItemMutation();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid, isDirty },
        reset
    } = useForm<CreateListItemSchema>({
        resolver: zodResolver(createListItemSchema),
        mode: 'onChange'
    });

    const handleCancel = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: CreateListItemSchema) => {
        try {
            await postListItem({ list_id: list.id, ...data }).unwrap();
            toast({
                title: 'Successfully created new list item!',
                status: 'success',
                duration: 9000,
                isClosable: true
            });
            reset();
        } catch (err) {
            toast({
                title: 'Failed to create list item',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    useOutsideClick({
        ref,
        handler: () => handleCancel()
    });

    const handleFormEscape = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            handleCancel();
        }
    };

    if (isOpen) {
        return (
            <form ref={ref} onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormEscape}>
                <FormControl isInvalid={!isValid}>
                    <Input
                        id={`${list.id}-create-list-item-title`}
                        isInvalid={!isDirty && !!errors.title}
                        placeholder='Item title'
                        autoFocus
                        {...register('title', { required: true })}
                    />
                    <FormErrorMessage fontSize='xs'>{errors.title?.message as string}</FormErrorMessage>
                </FormControl>
                <ButtonGroup justifyContent='end' width='full'>
                    <Button size='sm' type='button' onClick={() => handleCancel()}>
                        Cancel
                    </Button>
                    <Button size='sm' type='submit' isLoading={isSubmitting} disabled={!isValid}>
                        Add item
                    </Button>
                </ButtonGroup>
            </form>
        );
    }

    return (
        <Button
            onClick={onOpen}
            aria-label='Add new item'
            type='button'
            variant='ghost'
            size='sm'
            leftIcon={<AiOutlinePlus />}
        >
            Add new item
        </Button>
    );
}
