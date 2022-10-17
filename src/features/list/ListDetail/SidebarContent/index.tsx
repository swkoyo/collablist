import { Box, HStack, IconButton, StackDivider, Text, VStack } from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { useDeleteListMemberMutation } from '../../../../api/list';
import useAuth from '../../../../hooks/useAuth';
import { IList, IUser } from '../../../../types';
import { formatDate } from '../../../../utils/dayjs';
import AddMemberPopover from './AddMemberPopover';

export default function SidebarContent({ list }: { list: IList }) {
    const auth = useAuth() as IUser;
    const [deleteListMember] = useDeleteListMemberMutation();

    const handleDeleteMember = async (id: number) => {
        await deleteListMember({ list_id: list.id, list_member_id: id }).unwrap();
    };

    return (
        <Box flex='1' p={2}>
            <VStack divider={<StackDivider />} align='start'>
                <VStack align='start'>
                    <Text fontSize='xs' fontWeight='bold'>
                        Owner
                    </Text>
                    <Text fontSize='xs'>
                        {list.user.first_name} {list.user.last_name}
                    </Text>
                </VStack>
                <VStack align='start'>
                    <Text fontSize='xs' fontWeight='bold'>
                        Created at
                    </Text>
                    <Text fontSize='xs'>{formatDate(list.created_at)}</Text>
                </VStack>
                {list.is_complete ? (
                    <VStack align='start'>
                        <Text fontSize='xs' fontWeight='bold'>
                            Completed at
                        </Text>
                        <Text fontSize='xs'>{formatDate(list.updated_at)}</Text>
                    </VStack>
                ) : null}
                <VStack align='start' width='100%'>
                    <HStack width='full'>
                        <Text fontSize='xs' fontWeight='bold'>
                            Members ({list.members.length})
                        </Text>
                        <Box flex='1' />
                        <AddMemberPopover members={list.members} listId={list.id} disabled={list.is_complete} />
                    </HStack>
                    <VStack w='full'>
                        {list.members.map((m) => (
                            <HStack key={m.user.id} width='full'>
                                <Text fontSize='xs' key={m.user.id}>
                                    {m.user.first_name} {m.user.last_name}
                                </Text>
                                <Box flex='1' />
                                {m.user.id === auth.id ||
                                    (list.is_complete && (
                                        <IconButton
                                            aria-label='Remove member'
                                            type='button'
                                            size='2xs'
                                            variant='ghost'
                                            icon={<BiTrash />}
                                            onClick={() => handleDeleteMember(m.user.id)}
                                        />
                                    ))}
                            </HStack>
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        </Box>
    );
}
