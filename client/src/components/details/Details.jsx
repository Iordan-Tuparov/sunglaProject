import "./Details.css";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/authContext";
import { SunglassesContext } from "../../../context/sunglassesContext";
import * as sunglassesService from "../../services/sunglassesService";

import Comments from "./comments/Comments";
import Spinner from "../spinner/Spinner";

export default function Detaitls() {
    const [current, setCurrent] = useState({});
    const [load, setLoad] = useState(true);
    const [likes, setLikes] = useState(0);
    const [userLikes, setUserLikes] = useState(0);
    const { user, isAuthenticated } = useContext(AuthContext);
    const { addToCart } = useContext(SunglassesContext);
    const navigate = useNavigate();
    const { sunglassesId } = useParams();

    useEffect(() => {
        sunglassesService.getOne(sunglassesId)
            .then(data => setCurrent(data));

        sunglassesService.ownLikes(sunglassesId)
            .then(likesCount => setLikes(likesCount));

        sunglassesService.currentUserLikes(sunglassesId, user._id)
            .then(userLikesCount => setUserLikes(userLikesCount))

        setLoad(false);
    }, [sunglassesId, user._id]);

    const onLikeHandler = async (sunglassesId) => {
        await sunglassesService.like(sunglassesId);

        setLikes(state => state + 1);
        setUserLikes(1);

        navigate(`/sunglasses/${sunglassesId}/details`);
    };

    const addToCartHandler = (e) => {
        addToCart(current);
    };

    const isOwner = current._ownerId === user._id;

    return (
        <section className="details-page">
            <h1>Details page</h1>

            <Comments />

            {load
                ? <Spinner />
                :
                <div className="product">
                    <img src={current.imageUrl} alt="photo" />
                    <h3>Brand: {current.brand}</h3>
                    <p className="price"><strong>Price:</strong > ${current.price}</p>
                    <p>Description: {current.description}</p>
                    <div className="buttons">
                        <button>Likes: {likes}</button>
                        {isAuthenticated ?
                            <>
                                {isOwner
                                    ?
                                    <>
                                        <Link to={`/sunglasses/${current._id}/edit`}>Edit</Link>
                                        <Link to={`/sunglasses/${current._id}/delete`}>Delete</Link>
                                    </>
                                    : userLikes == 0
                                        ?
                                        <>
                                            <button onClick={() => onLikeHandler(current._id)}>Like</button>
                                        </>
                                        : <button>You already liked this post!</button>
                                }
                                <button onClick={addToCartHandler}>Add to Cart</button>
                            </>
                            : ""}
                    </div>
                </div>
            }

        </section >
    );
}