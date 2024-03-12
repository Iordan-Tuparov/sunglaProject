import "./Edit.css";

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { SunglassesContext } from "../../../context/sunglassesContext";
import * as sunglassesService from "../../services/sunglassesService";

export default function Edit() {
    const [current, setCurrent] = useState({});
    const [error, setError] = useState('');
    const { addSunglasses } = useContext(SunglassesContext);
    const navigate = useNavigate();
    const { sunglassesId } = useParams();

    useEffect(() => {
        sunglassesService.getOne(sunglassesId)
            .then(data => setCurrent(data));
    }, []);

    const onSetValueHandler = (e) => {
        setCurrent((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const sunglassesData = {
            brand: current.brand,
            price: current.price,
            description: current.description,
            imageUrl: current.imageUrl,
        };

        try {
            const data = await sunglassesService.edit(sunglassesId, sunglassesData)

            addSunglasses(data);
            navigate(`/sunglasses/${sunglassesId}/details`);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="edit-page">
            <h1>Edit page</h1>

            <form onSubmit={onSubmitHandler}>
                {error && <h3 className="error">{error}</h3>}
                <label htmlFor="brand">Brand:</label>
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={current.brand || ""}
                    onChange={onSetValueHandler}
                    placeholder="Brand"
                />
                <label htmlFor="price">Price:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={current.price || ""}
                    onChange={onSetValueHandler}

                    placeholder="Price"
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    value={current.description || ""}
                    onChange={onSetValueHandler}

                    placeholder="Description"

                ></textarea>
                <label htmlFor="imageUrl">imageUrl:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={current.imageUrl || ""}
                    onChange={onSetValueHandler}
                    placeholder="imageUrl"
                />
                <input type="submit" value="Edit product" />
            </form>
        </section>
    );
}
