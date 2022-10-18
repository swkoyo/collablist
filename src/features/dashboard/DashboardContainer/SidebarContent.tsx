import { Box, BoxProps, Center, CloseButton, Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { FaThList } from 'react-icons/fa';
import { FiUser, FiUsers } from 'react-icons/fi';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { RiFileHistoryLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
    const { hash } = useLocation();

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
            <Link href='#' textDecoration='none' _focus={{ boxShadow: 'none' }} _hover={{ textDecoration: 'none' }}>
                <Flex
                    align='center'
                    p='3'
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    bg={!hash ? 'cyan.400' : undefined}
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white'
                    }}
                    gap={1}
                >
                    <Icon as={HiOutlineDocumentDuplicate} />
                    <Text fontSize='xl'>Lists</Text>
                </Flex>
            </Link>
            <Link href='#owned' textDecoration='none' _focus={{ boxShadow: 'none' }}>
                <Flex
                    align='center'
                    p='3'
                    pl={8}
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    bg={hash === '#owned' ? 'cyan.400' : undefined}
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white'
                    }}
                    gap={1}
                >
                    <Icon as={FiUser} />
                    <Text fontSize='sm'>Owned</Text>
                </Flex>
            </Link>
            <Link href='#member' textDecoration='none' _focus={{ boxShadow: 'none' }}>
                <Flex
                    align='center'
                    p='3'
                    pl={8}
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    bg={hash === '#member' ? 'cyan.400' : undefined}
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white'
                    }}
                    gap={1}
                >
                    <Icon as={FiUsers} />
                    <Text fontSize='sm'>Member</Text>
                </Flex>
            </Link>
            <Link href='#history' textDecoration='none' _focus={{ boxShadow: 'none' }}>
                <Flex
                    align='center'
                    p='3'
                    pl={8}
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    bg={hash === '#history' ? 'cyan.400' : undefined}
                    cursor='pointer'
                    _hover={{
                        bg: 'cyan.400',
                        color: 'white'
                    }}
                    gap={1}
                >
                    <Icon as={RiFileHistoryLine} />
                    <Text fontSize='sm'>History</Text>
                </Flex>
            </Link>
        </Box>
    );
}
