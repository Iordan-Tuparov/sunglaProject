import "./Cart.css";

import { useContext } from "react";

import { SunglassesContext } from "../../../context/sunglassesContext";

export default function Cart() {
    const { cart, removeFromCart } = useContext(SunglassesContext);

    const onRemoveHandler = (sunglassesData) => {
        removeFromCart(sunglassesData);
    }

    return (
        <section className="cart-section">
            <h2>Sunglasses Shopping Cart</h2>

            <div className="cart-items">
                {cart.length > 0
                    ?
                    cart.map(x =>
                        <div className="cart-item">
                            <img src={x.imageUrl} alt={x.brand} />
                            <div className="item-details">
                                <h3>{x.brand}</h3>
                                <p>Quantity: {x.quantity ? x.quantity : 1}</p>
                                <p>Price: ${x.price}</p>
                                <button className="remove-btn" onClick={() => onRemoveHandler(x)}>Remove</button>
                            </div>
                        </div>
                    )
                    : <div className="message">Not have added products yet!</div>}

            </div>

            <div className="help-section">
                <p>Need Help? Contact us at <a href="mailto:support@example.com">support@example.com</a> or call <a href="tel:+18001234567">1-800-123-4567</a></p>
            </div>
        </section>
    );
}