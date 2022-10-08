import { Avatar, AvatarGroup, HStack, Progress, Td, Text, Tr } from '@chakra-ui/react';

export default function ListTableRow() {
    return (
        <Tr>
            <Td>List 1</Td>
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
            <Td>Dec 2024</Td>
        </Tr>
    );
}
