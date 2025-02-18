import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? true : false;
    });

    const [token, setToken] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? token : null;
    });

    const [user, setUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });

    const [authError, setAuthError] = useState(null);

    const login = (token, user) => {
        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuthenticated(true);
            setToken(token);
            setUser(user);
            setAuthError(false);
        } else {
            console.error("Token o usuario inválido");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user, token, isAuthenticated, authError, setAuthError, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}