import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import useAuth from '../../../hooks/useAuth';
import { User } from '../../../types';
import ListTableRow from './ListTableRow';

export default function ListTable() {
    const auth = useAuth() as User;

    return (
        <TableContainer>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Progress</Th>
                        <Th>Members</Th>
                        <Th>Created At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <ListTableRow />
                </Tbody>
            </Table>
        </TableContainer>
    );
}
