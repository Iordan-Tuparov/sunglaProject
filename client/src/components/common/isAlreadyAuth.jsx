import { Navigate, Outlet } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

const IsAlreadyAuth = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to="/404" replace />
    }

    return children ? children : <Outlet />
};

export default IsAlreadyAuth;