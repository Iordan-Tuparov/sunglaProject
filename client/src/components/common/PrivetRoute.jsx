import { Navigate, Outlet } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />
    }

    return children ? children : <Outlet />
};

export default PrivateRoute;
