import { Center, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetListsHistoryQuery } from '../../../api/list';
import useAuth from '../../../hooks/useAuth';
import { IUser } from '../../../types';
import ListTableRow from './ListTableRow';

export default function ListHistoryTable() {
    const auth = useAuth() as IUser;
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetListsHistoryQuery();

    useEffectOnce(() => {
        (async () => {
            await trigger({});
        })();
    });

    const getTableData = () => {
        if (!data || isLoading || isFetching) {
            return (
                <Center>
                    <Spinner />
                </Center>
            );
        }
        if (data.count === 0) {
            return (
                <Center>
                    <Text>No Data found</Text>
                </Center>
            );
        }
        if (isError) {
            return (
                <Center>
                    <Text>Error</Text>
                </Center>
            );
        }

        return (
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Items</Th>
                        <Th>Progress</Th>
                        <Th>Members</Th>
                        <Th>Created At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.data.map((d) => (
                        <ListTableRow key={d.id} list={d} />
                    ))}
                </Tbody>
            </Table>
        );
    };

    return <TableContainer>{getTableData()}</TableContainer>;
}
