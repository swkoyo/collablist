import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    HStack,
    Icon,
    IconButton,
    SkeletonText,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsTextLeft } from 'react-icons/bs';
import { useLazyGetListQuery } from '../../../api/list';
import { formatDate } from '../../../utils/dayjs';

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
                <Stack gap={0.5}>
                    <HStack>
                        <Checkbox />
                        <Text fontWeight='bold' fontSize='2xl'>
                            {data.title}
                        </Text>
                    </HStack>
                    <HStack alignItems='center' pl={7}>
                        <Icon as={BsTextLeft} />
                        <Text fontSize='sm'>{data.description}</Text>
                    </HStack>
                </Stack>
                <Accordion mt={5} allowToggle>
                    <AccordionItem border='none'>
                        <AccordionButton p='0' _hover={{ brightness: '100%' }}>
                            <AccordionIcon mr='2' />
                            <Stack flex='1'>
                                <HStack>
                                    <Text textAlign='left' fontSize='sm'>
                                        List Items
                                    </Text>
                                    <Text fontSize='xs'>
                                        {data.items.filter((i) => i.status).length}/{data.items.length}
                                    </Text>
                                </HStack>
                                <Divider height={0} />
                            </Stack>
                        </AccordionButton>
                        <AccordionPanel ml='3' pr={0}>
                            <Stack spacing={2} divider={<StackDivider />} align='stretch' width='100%'>
                                {data.items.map((i) => (
                                    <Flex key={i.id} verticalAlign='center' gap={2} p={0}>
                                        <Icon as={Checkbox} />
                                        <Text fontSize='sm'>{i.title}</Text>
                                    </Flex>
                                ))}
                                <Button
                                    aria-label='Add new item'
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    leftIcon={<AiOutlinePlus />}
                                >
                                    Add new item
                                </Button>
                            </Stack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
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
            <VStack divider={<StackDivider />} align='start'>
                <VStack align='start'>
                    <Text fontSize='xs' fontWeight='bold'>
                        Owner
                    </Text>
                    <Text fontSize='xs'>
                        {data.user.first_name} {data.user.last_name}
                    </Text>
                </VStack>
                <VStack align='start'>
                    <Text fontSize='xs' fontWeight='bold'>
                        Created at
                    </Text>
                    <Text fontSize='xs'>{formatDate(data.created_at)}</Text>
                </VStack>
                <VStack align='start' width='100%'>
                    <HStack width='full'>
                        <Text fontSize='xs' fontWeight='bold'>
                            Members ({data.members.length})
                        </Text>
                        <Box flex='1' />
                        <IconButton
                            aria-label='Add member'
                            size='xs'
                            type='button'
                            as={AiOutlinePlus}
                            _hover={{
                                cursor: 'pointer',
                                // eslint-disable-next-line
                                background: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
                            }}
                        />
                    </HStack>
                    <VStack>
                        {data.members.map((m) => (
                            <Text fontSize='xs' key={m.user.id}>
                                {m.user.first_name} {m.user.last_name}
                            </Text>
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        );
    };

    return (
        <HStack mt={4} minH='400px' align='start' divider={<StackDivider />}>
            <Box width='75%' pr={3}>
                {getMainData()}
            </Box>
            <Box flex='1' p={2}>
                {getSideData()}
            </Box>
        </HStack>
    );
}
