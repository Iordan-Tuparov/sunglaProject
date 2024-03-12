import "./Catalog.css"

import { useContext, useEffect, useState } from "react"
import { SunglassesContext } from "../../../context/sunglassesContext"

import CatalogItem from "./CatalogItem";
import * as sunglassesService from "../../services/sunglassesService";
import Spinner from "../spinner/Spinner";

export default function Catalog() {
    const { sunglasses, setSunglasses } = useContext(SunglassesContext);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        sunglassesService.getAll().then(data => {
            setSunglasses(data);
            setLoad(false);
        });
    }, []);

    return (
        <section className="catalog-page">
            <h1>Catalog page</h1>

            {load
                ?
                <Spinner />
                :
                <div className="catalog-products">
                    {sunglasses.length > 0 ? (
                        sunglasses.map((x) => <CatalogItem key={x._id} item={x} />)
                    ) : (
                        <h2>No sunglasses yet!</h2>
                    )}
                </div>
            }
        </section>
    )
}