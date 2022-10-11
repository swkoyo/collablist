import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { FaThList } from 'react-icons/fa';
import { resetAuth } from '../features/auth/authSlice';
import { ModalTypes, showModal } from '../features/modal/modalSlice';
import { useAppDispatch } from '../hooks/redux';
import useAuth from '../hooks/useAuth';

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const toast = useToast();

    const handleLogout = () => {
        dispatch(resetAuth());
        toast({
            title: 'Logout successful',
            status: 'success',
            duration: 9000,
            isClosable: true
        });
    };

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position='fixed' top={0} width='100%'>
            <Flex h={16} alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center' gap={2}>
                    <Center>
                        <Icon w={6} h={6} as={FaThList} />
                    </Center>
                    <Center>
                        <Text fontSize='2xl' fontWeight='bold'>
                            Collablist
                        </Text>
                    </Center>
                </Flex>
                <Flex alignItems='center'>
                    <Stack direction='row' spacing={4}>
                        <IconButton
                            aria-label='change theme'
                            onClick={toggleColorMode}
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        />
                        {auth ? (
                            <Menu>
                                <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW={0}>
                                    <Avatar size='sm' bg='blue.300' name={`${auth.first_name} ${auth.last_name}`} />
                                </MenuButton>
                                <MenuList alignItems='center'>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size='2xl'
                                            bg='blue.300'
                                            name={`${auth.first_name} ${auth.last_name}`}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{auth.username}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Button type='button' onClick={() => dispatch(showModal({ type: ModalTypes.AUTH_LOGIN }))}>
                                Login
                            </Button>
                        )}
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}
