import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    if (context === undefined) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }

    const { user, token, isAuthenticated, authError, setAuthError, login, logout } = context;

    const register = async (userData) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Error al registrar el usuario");
            }
            const data = await response.json();
            login(data.token, data.user);
            navigate("/home"); o
        } catch (error) {
            setAuthError(error.message);
            console.error("Error al registrar el usuario:", error);
        }
    };

    const loginUser = async (userData) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Error al iniciar sesión el usuario");
            }
            const data = await response.json();
            login(data.token, data.user);
            navigate("/home"); 
        } catch (error) {
            setAuthError(error.message);
            console.error("Error al iniciar sesión el usuario:", error);
        }
    };

    return { user, token, isAuthenticated, authError, setAuthError, login, logout, register, loginUser };
};