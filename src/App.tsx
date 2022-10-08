import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyCheckTokenQuery } from './api/auth';
import { setCredentials } from './features/auth/authSlice';
import RootModal from './features/modal/RootModal';
import { useAppDispatch } from './hooks/redux';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
    const dispatch = useAppDispatch();
    const [checkToken] = useLazyCheckTokenQuery();
	const [isLoading, setIsLoading] = useState(true);

    useEffectOnce(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const user = await checkToken(token).unwrap();
                    await dispatch(
                        setCredentials({
                            user,
                            token
                        })
                    );
                } catch (err) {
                    localStorage.removeItem('token');
                }
            }
			setIsLoading(false);
        })();
    });

	if (isLoading) {
		return <></>
	}

    return (
        <>
            <RootModal />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;
