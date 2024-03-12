import "./Create.css";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SunglassesContext } from "../../../context/sunglassesContext";

import * as sunglassesService from "../../services/sunglassesService";

export default function Create() {
    const navigate = useNavigate();
    const { addSunglasses } = useContext(SunglassesContext);
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        brand: "",
        price: "",
        description: "",
        imageUrl: "",
    });

    const onSetValueHandler = (e) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onCreateHandler = async (e) => {
        e.preventDefault();

        const sunglassesData = {
            brand: values.brand,
            price: values.price,
            description: values.description,
            imageUrl: values.imageUrl,
        }

        try {
            const data = await sunglassesService.create(sunglassesData);

            addSunglasses(data);
            navigate('/sunglasses/catalog');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="create-page">
            <h1>Create new sunglasses</h1>
            <form onSubmit={onCreateHandler}>
                {error && <h3 className="error">{error}</h3>}
                <label htmlFor="brand">Brand: </label>
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    placeholder="Some brand"
                    value={values.brand}
                    onChange={onSetValueHandler}
                />
                <br />
                <br />

                <label htmlFor="price">Price: </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    placeholder="Price"
                    value={values.price}
                    onChange={onSetValueHandler}
                />
                <br />
                <br />

                <label htmlFor="description">Description: </label>
                <br />
                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Description"
                    value={values.description}
                    onChange={onSetValueHandler}
                ></textarea>
                <br />
                <br />

                <label htmlFor="imageUrl">Image URL: </label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="imageUrl"
                    value={values.imageUrl}
                    onChange={onSetValueHandler}
                />
                <br />
                <br />

                <input type="submit" value="Create Product" />
            </form>
        </section>
    );
}
