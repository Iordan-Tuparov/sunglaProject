import { Link } from "react-router-dom";
import './ErrorPage.css';

export default function ErrorPage() {
    return (
        <section className="error-container">
            <h1>404</h1>
            <p>Page Not Found</p>
            <p>The page you are looking for might have been removed or does not exist. <br />
                <Link to="/">Go back to the homepage</Link></p>
        </section>)
}