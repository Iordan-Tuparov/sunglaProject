import "./MyProfile.css";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/authContext";
import * as sunglassesService from "../../services/sunglassesService";
import Spinner from "../spinner/Spinner";

export default function MyProfile() {
    const [sunglasses, setSunglasses] = useState([]);
    const [load, setLoad] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        sunglassesService.getAll()
            .then(data => {
                const ownSunglasses = data.filter(x => x._ownerId === user._id);

                setSunglasses(ownSunglasses);
                setLoad(false);
            });
    }, []);

    return (
        <section className="my-profile">
            <div className="card">
                <div className="img-container">
                    <img src={user.imageUrl || '/images/guest.png'} alt="John" />
                </div>
                <h1 className="title">{user.email}</h1>
            </div>
            <h2>Created suglassess</h2>
            {load
                ? <Spinner />
                :
                <div className="liked-container">
                    {sunglasses.length > 0 ? sunglasses.map(x =>
                        <div className="product" key={x._id}>
                            <p>Brand: {x.brand}</p>
                            <p className="price">Price: ${x.price}</p>
                            <Link to={`/sunglasses/${x._id}/details`}>More info</Link>
                        </div>
                    ) : <h2>No have created sunglasses!</h2>}
                </div>
            }
        </section>
    );
}