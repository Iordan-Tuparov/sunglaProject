import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", {});

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userRegister = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
        localStorage.removeItem('auth')
    };

    return (
        <AuthContext.Provider
            value={{
                user: auth,
                userRegister,
                userLogin,
                userLogout,
                isAuthenticated: !!auth.accessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
