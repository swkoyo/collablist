import { Route, Routes } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyCheckTokenQuery } from './api/auth';
import './App.css';
import { setCredentials } from './features/auth/authSlice';
import { useAppDispatch } from './hooks/redux';
import Home from './pages/Home';

function App() {
    const dispatch = useAppDispatch();
    const [checkToken] = useLazyCheckTokenQuery();

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
        })();
    });

    return (
        <Routes>
            <Route path='/' element={<Home />} />
        </Routes>
    );
}

export default App;
