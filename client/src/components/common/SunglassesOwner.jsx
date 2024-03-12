import { Navigate, Outlet } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { SunglassesContext } from "../../../context/sunglassesContext";

const SunglassesOwner = ({ children }) => {
    const { user, isAuthenticated } = useContext(AuthContext);
    const { getOne } = useContext(SunglassesContext);
    const { sunglassesId } = useParams();

    const currentSunglasses = getOne(sunglassesId);

    if (!isAuthenticated) {
        return <Navigate to="/404" replace />
    }

    if (user._id !== currentSunglasses._ownerId) {
        return <Navigate to="/404" replace />
    }

    return children ? children : <Outlet />
};

export default SunglassesOwner;