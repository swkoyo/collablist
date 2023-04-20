import { CheckIcon } from '@chakra-ui/icons';
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
    Tooltip,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { getErrorMessage } from '../../../../api/helpers';
import { usePutListMutation } from '../../../../api/list';
import { useAppDispatch } from '../../../../hooks/redux';
import { IList } from '../../../../types';
import { hideModal } from '../../../modal/modalSlice';

export default function MarkAsCompleteButton({ list }: { list: IList }) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const toast = useToast();
    const [putList] = usePutListMutation();
    const dispatch = useAppDispatch();

    const handleApply = async () => {
        try {
            await putList({ id: list.id, is_complete: true }).unwrap();
            toast({
                title: 'List marked as complete',
                status: 'success',
                duration: 9000,
                isClosable: true
            });
            onClose();
            dispatch(hideModal());
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

    return (
        <Popover returnFocusOnClose={false} isOpen={isOpen} onClose={onClose} placement='auto'>
            <PopoverTrigger>
                <Tooltip label='Mark as complete'>
                    <IconButton aria-label='Mark list as complete' size='sm' onClick={onToggle} icon={<CheckIcon />} />
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>Are you sure you want to mark this list as complete? This cannot be undone.</PopoverBody>
                <PopoverFooter display='flex' justifyContent='flex-end'>
                    <ButtonGroup size='sm'>
                        <Button variant='outline' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => handleApply()}>
                            Apply
                        </Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}
