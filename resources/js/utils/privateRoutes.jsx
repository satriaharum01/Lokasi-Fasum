import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../apilogin';

const PrivateRoute = ({ isLoggedIn,setIsLoggedIn }) => {

    useEffect(() => {
        // Mendapatkan user aktif dari sesi
        const fetchUser = async () => {
            try {
                const response = await api.get('/api/user');
                setIsLoggedIn(true);
            } catch (error) {
                window.location.href = "/account/login";
                console.log('Not authenticated');
            }
        };

        fetchUser();
    }, [isLoggedIn]);

    return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoute;
