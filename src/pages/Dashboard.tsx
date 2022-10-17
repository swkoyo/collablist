import { useLocation } from 'react-router-dom';
import DashboardContainer from '../features/dashboard/DashboardContainer';
import ListCurrentTable from '../features/list/ListView/ListCurrentTable';
import ListHistoryTable from '../features/list/ListView/ListHistoryTable';

export default function Dashboard() {
    const { hash } = useLocation();

    return <DashboardContainer>{hash === '#history' ? <ListHistoryTable /> : <ListCurrentTable />}</DashboardContainer>;
}
