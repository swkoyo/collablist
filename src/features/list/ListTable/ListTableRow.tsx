import { MinusIcon } from '@chakra-ui/icons';
import { Avatar, AvatarGroup, HStack, Progress, Td, Text, Tr } from '@chakra-ui/react';
import { round } from 'lodash';
import { List } from '../../../types';
import { formatDate } from '../../../utils/dayjs';

export default function ListTableRow({ list }: { list: List }) {
    let progress = null;

    if (list.items.length > 0) {
        const completeItems = list.items.filter((i) => i.status).length;
        progress = round(completeItems / list.items.length, 0);
    }

    return (
        <Tr>
            <Td>{list.title}</Td>
            <Td>{list.items.length}</Td>
            <Td>
                {progress ? (
                    <HStack>
                        <Progress hasStripe value={progress} width='80%' />
                        <Text>{progress}%</Text>
                    </HStack>
                ) : (
                    <Text>Add items to update progress</Text>
                )}
            </Td>
            <Td>
                <AvatarGroup size='sm' spacing={-1} max={2}>
                    {list.members.length > 0 ? (
                        list.members.map((m) => <Avatar name={`${m.first_name} ${m.last_name}`} />)
                    ) : (
                        <Avatar icon={<MinusIcon />} />
                    )}
                </AvatarGroup>
            </Td>
            <Td>{formatDate(list.created_at)}</Td>
        </Tr>
    );
}
