import Spinner from "../spinner/Spinner";
import "./Home.css"

import { Link } from "react-router-dom";
export default function Home() {
    return (
        <section className="home-page">
            <div className="header">
                <h1>Home page</h1>
                <p>Pick your perfect sunglasses for the summer!</p>
            </div>
            <div className="sunglasses-container">
                <Link to="/sunglasses/catalog" className="sunglasses-link">
                    <img src="/images/glass3.png" alt="Sunglasses" className="sunglasses-image" />
                    <span className="ux-message">Browse Sunglasses</span>
                </Link>
            </div>
        </section >
    );
}