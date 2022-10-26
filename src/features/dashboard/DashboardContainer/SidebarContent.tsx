import { Box, BoxProps, Center, CloseButton, Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { FaThList } from 'react-icons/fa';
import { FiUser, FiUsers } from 'react-icons/fi';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { RiFileHistoryLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { IUser, UserRole } from '../../../types';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
    const { hash } = useLocation();
    const auth = useAuth() as IUser;

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
            <Link
                href='#'
                textDecoration='none'
                _focus={{ boxShadow: 'none', textDecoration: 'none' }}
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    align='center'
                    p='3'
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    bg={!hash ? useColorModeValue('blackAlpha.300', 'whiteAlpha.300') : undefined}
                    _hover={{
                        bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
                    }}
                    gap={1}
                >
                    <Icon as={HiOutlineDocumentDuplicate} />
                    <Text fontSize='xl'>Lists</Text>
                </Flex>
            </Link>
            {auth.role === UserRole.USER && (
                <>
                    <Link
                        href='#owned'
                        textDecoration='none'
                        _focus={{ boxShadow: 'none', textDecoration: 'none' }}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Flex
                            align='center'
                            p='3'
                            pl={8}
                            mx='4'
                            borderRadius='lg'
                            role='group'
                            cursor='pointer'
                            bg={hash === '#owned' ? useColorModeValue('blackAlpha.300', 'whiteAlpha.300') : undefined}
                            _hover={{
                                bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
                            }}
                            gap={1}
                        >
                            <Icon as={FiUser} />
                            <Text fontSize='sm'>Owned</Text>
                        </Flex>
                    </Link>
                    <Link
                        href='#member'
                        textDecoration='none'
                        _focus={{ boxShadow: 'none', textDecoration: 'none' }}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Flex
                            align='center'
                            p='3'
                            pl={8}
                            mx='4'
                            borderRadius='lg'
                            role='group'
                            cursor='pointer'
                            bg={hash === '#member' ? useColorModeValue('blackAlpha.300', 'whiteAlpha.300') : undefined}
                            _hover={{
                                bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
                            }}
                            gap={1}
                        >
                            <Icon as={FiUsers} />
                            <Text fontSize='sm'>Member</Text>
                        </Flex>
                    </Link>
                </>
            )}
            <Link
                href='#history'
                textDecoration='none'
                _focus={{ boxShadow: 'none', textDecoration: 'none' }}
                _hover={{ textDecoration: 'none' }}
            >
                <Flex
                    align='center'
                    p='3'
                    pl={8}
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    bg={hash === '#history' ? useColorModeValue('blackAlpha.300', 'whiteAlpha.300') : undefined}
                    cursor='pointer'
                    _hover={{
                        bg: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
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
