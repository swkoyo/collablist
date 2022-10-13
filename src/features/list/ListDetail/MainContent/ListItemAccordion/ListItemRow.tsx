import { Checkbox, Flex, Icon, Text } from '@chakra-ui/react';
import { IListItem } from '../../../../../types';

export default function ListItemRow({ item }: { item: IListItem }) {
    return (
        <Flex verticalAlign='center' gap={2} p={0}>
            <Icon as={Checkbox} />
            <Text fontSize='sm'>{item.title}</Text>
        </Flex>
    );
}
