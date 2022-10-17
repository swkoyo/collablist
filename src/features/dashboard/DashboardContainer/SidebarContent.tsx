import {
    Box,
    BoxProps,
    Center,
    CloseButton,
    Flex,
    Icon,
    Link,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { FaThList } from 'react-icons/fa';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
    return (
        <Box
            transition='3s ease'
            bg={useColorModeValue('white', 'gray.900')}
            borderRight='1px'
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos='fixed'
            h='full'
            {...rest}
        >
            <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
                <Flex alignItems='center' gap={2} fontSize='2xl' fontWeight='bold'>
                    <Center>
                        <Icon w={6} h={6} as={FaThList} />
                    </Center>
                    <Center>
                        <Text fontSize='2xl' fontWeight='bold'>
                            Collablist
                        </Text>
                    </Center>
                </Flex>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Link href='#' textDecoration='none' _focus={{ boxShadow: 'none' }}>
                <Flex
                    align='center'
                    p='4'
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white'
                    }}
                >
                    <Text fontSize='2xl'>Lists</Text>
                </Flex>
            </Link>
            <VStack align='start' pl={8}>
                <Link href='#owned' textDecoration='none' _focus={{ boxShadow: 'none' }}>
                    <Flex
                        align='center'
                        mx='4'
                        borderRadius='lg'
                        role='group'
                        cursor='pointer'
                        _hover={{
                            bg: 'cyan.400',
                            color: 'white'
                        }}
                    >
                        <Text fontSize='sm'>Owned</Text>
                    </Flex>
                </Link>
                <Link href='#member' textDecoration='none' _focus={{ boxShadow: 'none' }}>
                    <Flex
                        align='center'
                        mx='4'
                        borderRadius='lg'
                        role='group'
                        cursor='pointer'
                        _hover={{
                            bg: 'cyan.400',
                            color: 'white'
                        }}
                    >
                        <Text fontSize='sm'>Member</Text>
                    </Flex>
                </Link>
            </VStack>
            <Link href='#history' textDecoration='none' _focus={{ boxShadow: 'none' }}>
                <Flex
                    align='center'
                    p='4'
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white'
                    }}
                >
                    <Text fontSize='2xl'>History</Text>
                </Flex>
            </Link>
        </Box>
    );
}
