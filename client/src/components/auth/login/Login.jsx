import "./Login.css";

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authContext"

import * as authService from "../../../services/authService";

export default function Login() {
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSetValueHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await authService.login(values.email, values.password);

            userLogin(user);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="login-page">
            <h1>Login</h1>
            {error && <h3 className="error">{error}</h3>}
            <div>
                <form className="login-form" onSubmit={onLogin}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={values.email} onChange={onSetValueHandler} placeholder="Email" />
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={values.password} onChange={onSetValueHandler} placeholder="Password" />
                    <button type="submit">Login</button>
                    <Link to="/auth/register">If don't have account</Link>
                </form>
            </div>
        </section>
    )
}