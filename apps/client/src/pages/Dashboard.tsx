import { Navigate, useLocation } from 'react-router-dom';
import DashboardContainer from '../features/dashboard/DashboardContainer';
import ListCurrentTable from '../features/list/ListView/ListCurrentTable';
import ListHistoryTable from '../features/list/ListView/ListHistoryTable';
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
    const auth = useAuth();
    const { hash } = useLocation();

    if (!auth) {
        return <Navigate to='/' />;
    }

    return <DashboardContainer>{hash === '#history' ? <ListHistoryTable /> : <ListCurrentTable />}</DashboardContainer>;
}
