import { Center, Spinner, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetListsQuery } from '../../../api/list';
import useAuth from '../../../hooks/useAuth';
import { IList, IUser } from '../../../types';
import ListTableRow from './ListTableRow';

export default function ListCurrentTable() {
    const auth = useAuth() as IUser;
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetListsQuery();
    const { hash } = useLocation();

    useEffectOnce(() => {
        (async () => {
            await trigger();
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
        if (data.length === 0) {
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

        let results: IList[];

        switch (hash) {
            case '#owned':
                results = data.filter((d) => d.user.id === auth.id);
                break;
            case '#member':
                results = data.filter((d) => d.members.some((m) => m.user.id === auth.id));
                break;
            default:
                results = data;
                break;
        }

        if (results.length === 0) {
            return (
                <Center>
                    <Text>No Data found</Text>
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
                    {results.map((d) => (
                        <ListTableRow key={d.id} list={d} />
                    ))}
                </Tbody>
            </Table>
        );
    };

    return <TableContainer>{getTableData()}</TableContainer>;
}
