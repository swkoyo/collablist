import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Divider,
    HStack,
    Stack,
    StackDivider,
    Text
} from '@chakra-ui/react';
import { IList } from '../../../../../types';
import AddItemForm from './AddItemForm';
import ListItemRow from './ListItemRow';

export default function ListItemAccordion({ list }: { list: IList }) {
    return (
        <Accordion mt={5} allowToggle defaultIndex={0}>
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
                        {[...list.items]
                            .sort((x, y) => Number(x.status) - Number(y.status))
                            .map((i) => (
                                <ListItemRow key={i.id} list={list} item={i} />
                            ))}
                        <AddItemForm list={list} />
                    </Stack>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
