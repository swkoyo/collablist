import { Box, Flex, List, ListItem, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLazyGetListQuery } from '../../../api/list';

export default function ListDetail({ listId }: { listId: number }) {
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetListQuery();

    useEffect(() => {
        (async () => {
            trigger(listId);
        })();
    }, [trigger, listId]);

    const getMainData = () => {
        if (isError) {
            return <Text>Something went wrong!</Text>;
        }
        if (!data || isLoading || isFetching) {
            return (
                <>
                    <SkeletonText />
                    <SkeletonText />
                    <SkeletonText />
                </>
            );
        }
        return (
            <>
                <Text>{data.title}</Text>
                <Text>{data.description}</Text>
                <List>
                    <ListItem>Hi</ListItem>
                </List>
            </>
        );
    };

    const getSideData = () => {
        if (isError) {
            return null;
        }
        if (!data || isLoading || isFetching) {
            return (
                <VStack>
                    <SkeletonText />
                    <SkeletonText />
                    <SkeletonText />
                </VStack>
            );
        }
        return (
            <VStack>
                <Text>
                    Created by: {data.user.first_name} {data.user.last_name}
                </Text>
                <Text>Progress</Text>
                <Text>Members</Text>
            </VStack>
        );
    };

    return (
        <Flex mt={4} minH='400px'>
            <Box width='75%'>{getMainData()}</Box>
            <Box flex='1'>{getSideData()}</Box>
        </Flex>
    );
}
