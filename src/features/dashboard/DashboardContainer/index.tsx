import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import SidebarContent from './SidebarContent';
import TopBar from './TopBar';

export default function DashboardContainer({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <TopBar onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p='4'>
                {children}
            </Box>
        </Box>
    );
}
