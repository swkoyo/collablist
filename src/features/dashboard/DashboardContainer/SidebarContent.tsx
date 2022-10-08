import { Box, BoxProps, Center, CloseButton, Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaThList } from 'react-icons/fa';
import { FiCompass, FiHome, FiSettings, FiStar, FiTrendingUp } from 'react-icons/fi';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

interface LinkItemProps {
    name: string;
    icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
    { name: 'Favourites', icon: FiStar },
    { name: 'Settings', icon: FiSettings }
];

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
            {LinkItems.map(({ name, icon }) => (
                <Link key={name} href='#' style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
                        {...rest}
                    >
                        {icon && (
                            <Icon
                                mr='4'
                                fontSize='16'
                                _groupHover={{
                                    color: 'white'
                                }}
                                as={icon}
                            />
                        )}
                        {name}
                    </Flex>
                </Link>
            ))}
        </Box>
    );
}
