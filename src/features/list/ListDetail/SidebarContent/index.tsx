import { Box, HStack, IconButton, StackDivider, Text, VStack } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { IList } from '../../../../types';
import { formatDate } from '../../../../utils/dayjs';

export default function SidebarContent({ list }: { list: IList }) {
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
                <VStack align='start' width='100%'>
                    <HStack width='full'>
                        <Text fontSize='xs' fontWeight='bold'>
                            Members ({list.members.length})
                        </Text>
                        <Box flex='1' />
                        <IconButton aria-label='Add member' size='2xs' type='button' icon={<AiOutlinePlus />} />
                    </HStack>
                    <VStack w='full'>
                        {list.members.map((m) => (
                            <HStack key={m.user.id} width='full'>
                                <Text fontSize='xs' key={m.user.id}>
                                    {m.user.first_name} {m.user.last_name}
                                </Text>
                                <Box flex='1' />
                                <IconButton
                                    aria-label='Remove member'
                                    type='button'
                                    size='2xs'
                                    variant='link'
                                    icon={<BiTrash />}
                                />
                            </HStack>
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        </Box>
    );
}
