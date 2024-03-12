import { Link } from "react-router-dom";
import "./Header.css"

import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { SunglassesContext } from "../../../context/sunglassesContext";

export default function Header() {
    const { isAuthenticated, user } = useContext(AuthContext);
    const { cart } = useContext(SunglassesContext);

    return (
        <header className="header-page">
            <ul>
                <li className="user-photo"><img src={user.imageUrl || "/images/guest.png"} alt="userPhoto" /></li>
                <li className="username"><p>Welcome {user.email || 'Guest!'}</p></li>
                <li><Link to="/" className="navbar">Home</Link></li>
                <li><Link to="/about" className="navbar">About</Link></li>
                <li><Link to="/sunglasses/catalog" className="navbar">Catalog</Link></li>
                {isAuthenticated ?
                    <>
                        <li><Link to="/my-profile" className="navbar">Profile</Link></li>
                        <li><Link to="/sunglasses/create" className="navbar">Create</Link></li>
                        <li>
                            <Link to="/sunglasses/cart" className="navbar">Cart</Link>
                            <span className="product-count">{cart.length}</span>
                        </li>
                        <li><Link to="/logout" className="navbar">Logout</Link></li>
                    </>
                    :
                    <>
                        <li><Link to="/auth/register" className="navbar">Register</Link></li>
                        <li><Link to="/auth/login" className="navbar">Login</Link></li>
                    </>
                }
            </ul>
        </header>
    );
}