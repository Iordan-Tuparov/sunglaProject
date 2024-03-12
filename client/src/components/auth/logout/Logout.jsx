import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../../context/authContext';

const Logout = () => {
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);

    useEffect(() => {
        userLogout();
        navigate('/');
    }, []);

    return null;
}

export default Logout;
