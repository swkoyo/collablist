import { Avatar, AvatarGroup, HStack, Progress, Td, Text, Tr } from '@chakra-ui/react';
import { List } from '../../../types';
import { formatDate } from '../../../utils/dayjs';

export default function ListTableRow({ list }: { list: List }) {
    return (
        <Tr>
            <Td>{list.title}</Td>
            <Td>
                <HStack>
                    <Progress hasStripe value={80} width='80%' />
                    <Text>80%</Text>
                </HStack>
            </Td>
            <Td>
                <AvatarGroup size='sm' spacing={-1} max={2}>
                    <Avatar name='hi there' />
                    <Avatar name='hi there' />
                    <Avatar name='hi there' />
                    <Avatar name='hi there' />
                    <Avatar name='hi there' />
                </AvatarGroup>
            </Td>
            <Td>{formatDate(list.created_at)}</Td>
        </Tr>
    );
}
