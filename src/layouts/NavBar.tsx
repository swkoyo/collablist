import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
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
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems='center' justifyContent='space-between'>
                <Box>Collablist</Box>
                <Flex alignItems='center'>
                    <Stack direction='row' spacing={4}>
                        <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
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
                            <Button type='button' onClick={() => dispatch(showModal(ModalTypes.AUTH_LOGIN))}>
                                Login
                            </Button>
                        )}
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}
