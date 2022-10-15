import {
    Avatar,
    Box,
    Button,
    Center,
    Divider,
    HStack,
    Icon,
    IconButton,
    Input,
    InputProps,
    List,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Spinner,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiFrown } from 'react-icons/fi';
import { HiOutlineUsers } from 'react-icons/hi';
import { useDebounce } from 'usehooks-ts';
import { usePostListMembersMutation } from '../../../../../api/list';
import { useLazyGetUsersQuery } from '../../../../../api/user';
import { IList } from '../../../../../types';

const TextInput = forwardRef((props: InputProps, ref) => {
    return <Input ref={ref as unknown as any} {...props} />;
});

export default function AddMemberPopover({ listId, members }: { listId: number; members: IList['members'] }) {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const firstFieldRef = useRef(null);
    const [trigger, { data, isLoading, isFetching }] = useLazyGetUsersQuery();
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce<string>(search, 300);
    const [postListMembers] = usePostListMembersMutation();

    useEffect(() => {
        (async () => {
            if (debouncedSearch.length > 0) {
                await trigger({ search: debouncedSearch, exclude_ids: members.map((m) => m.user.id) });
            }
        })();
    }, [debouncedSearch, trigger, members]);

    const handleAddMember = async (id: number) => {
        await postListMembers({ list_id: listId, user_ids: [id] }).unwrap();
        onClose();
    };

    const searchResults = () => {
        if (isLoading || isFetching) {
            return (
                <Center p={4}>
                    <Spinner />
                </Center>
            );
        }
        if (!search || !data) {
            return (
                <Center flexDirection='column' gap={2}>
                    <Icon w={5} h={5} as={HiOutlineUsers} />
                    <Text fontSize='sm'>Start typing to get users</Text>
                </Center>
            );
        }
        if (data.count === 0) {
            return (
                <Center flexDirection='column' gap={2}>
                    <Icon w={5} h={5} as={FiFrown} />
                    <Text fontSize='sm'>No users found!</Text>
                </Center>
            );
        }
        return (
            <List spacing={2} w='full'>
                {data.data.map((d) => (
                    <ListItem key={d.id} as={Button} variant='ghost' w='full' onClick={() => handleAddMember(d.id)}>
                        <HStack>
                            <Avatar size='xs' name={`${d.first_name} ${d.last_name}`} />
                            <Box>
                                <Text fontSize='sm'>
                                    {d.first_name} {d.last_name}
                                </Text>
                                <Text fontSize='2xs'>{d.email}</Text>
                            </Box>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement='auto'
            closeOnBlur
            closeOnEsc
        >
            <PopoverTrigger>
                <IconButton aria-label='Add member' icon={<AiOutlinePlus />} variant='ghost' size='2xs' />
            </PopoverTrigger>
            <PopoverContent py={2}>
                <FocusLock returnFocus persistentFocus={false}>
                    <PopoverArrow />
                    <TextInput
                        size='sm'
                        px={2}
                        placeholder='Search by name, email, or username'
                        variant='unstyled'
                        ref={firstFieldRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Divider my={3} />
                    <Box px={2}>{searchResults()}</Box>
                </FocusLock>
            </PopoverContent>
        </Popover>
    );
}
