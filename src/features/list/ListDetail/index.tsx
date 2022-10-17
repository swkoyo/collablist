import { Center, HStack, Icon, Spinner, StackDivider, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FiFrown } from 'react-icons/fi';
import { useLazyGetListQuery } from '../../../api/list';
import MainContent from './MainContent';
import SidebarContent from './SidebarContent';

export default function ListDetail({ listId }: { listId: number }) {
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetListQuery();

    useEffect(() => {
        (async () => {
            await trigger(listId);
        })();
    }, [trigger, listId]);

    if (isError) {
        return (
            <Center minH='400px' flexDirection='column' gap={2}>
                <Icon width={10} height={10} as={FiFrown} />
                <Text fontSize='xl'>An error occured. Please try again</Text>
            </Center>
        );
    }

    if (!data || isLoading || isFetching) {
        return (
            <Center minH='400px' flexDirection='column' gap={2}>
                <Spinner />
                <Text fontSize='xl'>Fetching your data...</Text>
            </Center>
        );
    }

    return (
        <HStack mt={4} minH='400px' align='start' divider={<StackDivider />}>
            <MainContent list={data} />
            <SidebarContent list={data} />
        </HStack>
    );
}
