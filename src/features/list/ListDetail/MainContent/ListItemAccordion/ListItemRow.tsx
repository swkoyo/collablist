import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
    Box,
    ButtonGroup,
    Checkbox,
    Flex,
    FormControl,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useDisclosure,
    useOutsideClick,
    useToast
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BiTrash } from 'react-icons/bi';
import { getErrorMessage } from '../../../../../api/helpers';
import { useDeleteListItemMutation, usePutListItemMutation } from '../../../../../api/list';
import { IListItem } from '../../../../../types';
import { editListItemSchema, EditListItemSchema } from './schema';

export default function ListItemRow({ listId, item }: { listId: number; item: IListItem }) {
    const [putListItem] = usePutListItemMutation();
    const [deleteListItem] = useDeleteListItemMutation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref = useRef<HTMLFormElement>(null);
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, isValid },
        reset
    } = useForm<EditListItemSchema>({
        resolver: zodResolver(editListItemSchema),
        defaultValues: {
            title: item.title
        },
        mode: 'onChange'
    });

    const handleStatusUpdate = async () => {
        try {
            await putListItem({ list_id: listId, id: item.id, status: !item.status }).unwrap();
        } catch (err) {
            toast({
                title: 'Failed to update status',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    const handleRemove = async () => {
        try {
            await deleteListItem({ list_id: listId, id: item.id }).unwrap();
        } catch (err) {
            toast({
                title: 'Failed to remove item',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    const onSubmit = async (data: EditListItemSchema) => {
        try {
            await putListItem({ list_id: listId, id: item.id, ...data }).unwrap();
            onClose();
        } catch (err) {
            toast({
                title: 'Failed to edit item',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            onClose();
        }
    };

    const handleCancel = () => {
        reset();
        onClose();
    };

    useOutsideClick({
        ref,
        handler: () => handleCancel()
    });

    return (
        <Flex verticalAlign='center' gap={1} px={1} py={0}>
            <Checkbox isChecked={item.status} onChange={() => handleStatusUpdate()} />
            {isOpen ? (
                <form ref={ref} onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <FormControl isInvalid={!isValid}>
                        <InputGroup size='sm'>
                            <Input
                                id={`${item.id}-edit-value`}
                                isInvalid={!isValid}
                                placeholder='Item title'
                                {...register('title', { required: true })}
                            />
                            <InputRightElement width='4.5rem'>
                                <ButtonGroup gap={0}>
                                    <IconButton
                                        aria-label={`${item.id}-edit-cancel`}
                                        size='xs'
                                        h='1.3rem'
                                        type='button'
                                        onClick={() => handleCancel()}
                                        icon={<CloseIcon />}
                                    />
                                    <IconButton
                                        aria-label={`${item.id}-edit-submit`}
                                        size='xs'
                                        h='1.3rem'
                                        type='submit'
                                        icon={<CheckIcon />}
                                        isLoading={isSubmitting}
                                        disabled={!isValid}
                                    />
                                </ButtonGroup>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                </form>
            ) : (
                <HStack width='full' ml={2}>
                    <Text textDecoration={item.status ? 'line-through' : 'none'} fontSize='sm'>
                        {item.title}
                    </Text>
                    <Box flex='1' />
                    <ButtonGroup>
                        <IconButton
                            aria-label={`${item.id}-item-edit`}
                            size='2xs'
                            type='button'
                            onClick={() => onOpen()}
                            icon={<EditIcon />}
                        />
                        <IconButton
                            aria-label={`${item.id}-item-delete`}
                            size='2xs'
                            type='button'
                            icon={<BiTrash />}
                            onClick={() => handleRemove()}
                        />
                    </ButtonGroup>
                </HStack>
            )}
        </Flex>
    );
}
