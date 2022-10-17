import {
    Button,
    ButtonGroup,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { getErrorMessage } from '../../../../api/helpers';
import { useDeleteListMutation } from '../../../../api/list';
import { useAppDispatch } from '../../../../hooks/redux';
import { IList } from '../../../../types';
import { hideModal, updateModalMeta } from '../../../modal/modalSlice';

export default function DeleteListButton({ list }: { list: IList }) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const toast = useToast();
    const [deleteList] = useDeleteListMutation({
        fixedCacheKey: `delete-list-${list.id}`
    });
    const dispatch = useAppDispatch();

    const handleApply = async () => {
        try {
            await dispatch(updateModalMeta({ meta: {} }));
            await deleteList(list.id);
            toast({
                title: 'List deleted',
                status: 'success',
                duration: 9000,
                isClosable: true
            });
            onClose();
            dispatch(hideModal());
        } catch (err) {
            toast({
                title: 'Failed to delete list',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            onClose();
        }
    };

    return (
        <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement='auto'>
            <PopoverTrigger>
                <IconButton aria-label='Delete list' size='sm' onClick={onToggle} icon={<BiTrash />} />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Are you sure you want to delete this list?</PopoverBody>
                <PopoverFooter display='flex' justifyContent='flex-end'>
                    <ButtonGroup size='sm'>
                        <Button variant='outline' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => handleApply()}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}
