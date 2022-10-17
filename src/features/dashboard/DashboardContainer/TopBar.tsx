import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Center,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    useToast,
    VStack
} from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { FaThList } from 'react-icons/fa';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useGetListsQueryState } from '../../../api/list';
import { useAppDispatch } from '../../../hooks/redux';
import useAuth from '../../../hooks/useAuth';
import { IUser } from '../../../types';
import { resetAuth } from '../../auth/authSlice';
import { ModalTypes, showModal } from '../../modal/modalSlice';

interface TopBarProps extends FlexProps {
    onOpen: () => void;
}

export default function TopBar({ onOpen, ...rest }: TopBarProps) {
    const { colorMode, toggleColorMode } = useColorMode();
    const auth = useAuth() as IUser;
    const dispatch = useAppDispatch();
    const toast = useToast();
    const { data, isLoading, isFetching } = useGetListsQueryState();

    const handleLogout = () => {
        dispatch(resetAuth());
        toast({
            title: 'Logout successful',
            status: 'success',
            duration: 9000,
            isClosable: true
        });
    };

    const canAddList = () => {
        return data && !isLoading && !isFetching && data.length < 10;
    };

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height='20'
            alignItems='center'
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth='1px'
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant='outline'
                aria-label='open menu'
                icon={<FiMenu />}
            />
            <Flex alignItems='center' gap={2} display={{ base: 'flex', md: 'none' }} fontSize='2xl' fontWeight='bold'>
                <Center>
                    <Icon w={6} h={6} as={FaThList} />
                </Center>
                <Center>
                    <Text fontSize='2xl' fontWeight='bold'>
                        Collablist
                    </Text>
                </Center>
            </Flex>
            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    size='lg'
                    aria-label='Create New List'
                    disabled={!canAddList()}
                    onClick={() => dispatch(showModal({ type: ModalTypes.LIST_CREATE }))}
                    icon={<AddIcon />}
                />
                <IconButton
                    size='lg'
                    variant='ghost'
                    aria-label='change theme'
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                />
                <Flex alignItems='center'>
                    <Menu>
                        <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar size='sm' bg='blue.300' name={`${auth.first_name} ${auth.last_name}`} />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems='flex-start'
                                    spacing='1px'
                                    ml='2'
                                >
                                    <Text fontSize='sm'>{auth.username}</Text>
                                    <Text fontSize='xs' color='gray.600'>
                                        {capitalize(auth.role as unknown as string)}
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
}
