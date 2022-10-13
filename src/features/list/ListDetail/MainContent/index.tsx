import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
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
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    StackDivider,
    Text
} from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsTextLeft } from 'react-icons/bs';
import { IList } from '../../../../types';

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
                                    {list.items.filter((i) => i.status).length}/{list.items.length}
                                </Text>
                            </HStack>
                            <Divider height={0} />
                        </Stack>
                    </AccordionButton>
                    <AccordionPanel ml='3' pr={0}>
                        <Stack spacing={2} divider={<StackDivider />} align='stretch' width='100%'>
                            {list.items.map((i) => (
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
        </Box>
    );
}
