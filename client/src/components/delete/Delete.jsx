import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { SunglassesContext } from '../../../context/sunglassesContext';

import * as sunglassesService from "../../services/sunglassesService";

const Delete = () => {
    const navigate = useNavigate();
    const { sunglassesId } = useParams();
    const { removeOne } = useContext(SunglassesContext);

    useEffect(() => {
        sunglassesService.deleteOne(sunglassesId)
            .then(data => {
                removeOne(data);
                navigate('/sunglasses/catalog');
            });
    }, []);

    return null;
}

export default Delete;
