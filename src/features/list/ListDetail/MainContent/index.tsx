import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import { Box, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react';
import { BsTextLeft } from 'react-icons/bs';
import { IList } from '../../../../types';
import ListItemAccordion from './ListItemAccordion';

export default function MainContent({ list }: { list: IList }) {
    return (
        <Box width='75%' pr={3}>
            <Stack gap={0.5}>
                <HStack>
                    <Text fontWeight='bold' fontSize='2xl'>
                        {list.title}
                    </Text>
                    <Menu>
                        <MenuButton as={IconButton} aria-label='Options' icon={<EditIcon />} variant='ghost' />
                        <MenuList>
                            <MenuItem icon={<CheckCircleIcon />}>Mark all items as complete</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
                <HStack alignItems='center' pl={7}>
                    <Icon as={BsTextLeft} />
                    <Text fontSize='sm'>{list.description}</Text>
                </HStack>
            </Stack>
            <ListItemAccordion list={list} />
        </Box>
    );
}
