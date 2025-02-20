import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import Search from "../pages/Search";
import Reviews from "../pages/Reviews";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children:[
            {
                index: true,
                element: <Navigate to="login" replace/>,
            },
            {
                path:"home",
                element: (
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>
                ),
            },
            {
                path:"movies",
                element: (
                    <ProtectedRoute>
                        <MovieList/>
                    </ProtectedRoute>
                ),
            },
            {
                path:"movies/:id",
                element: (
                    <ProtectedRoute>
                        <MovieDetail/>
                    </ProtectedRoute>
                ),
            },
            {
                path:"search",
                element: (
                    <ProtectedRoute>
                        <Search/>
                    </ProtectedRoute>
                )
            },
            {
                path:"reviews",
                element:(
                    <ProtectedRoute>
                        <Reviews/>
                    </ProtectedRoute>
                )
            },
            {
                path:"favorites",
                element:(
                    <ProtectedRoute>
                        <Favorites/>
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path:"/login",
        element: <AuthLayout/>,
        children: [
            {
                index: true,
                element: <LoginPage/>,
            }
        ]
    },
    {
        path:"/register",
        element: <AuthLayout/>,
        children: [
            {
                index: true,
                element: <RegisterPage/>,
            }
        ]
    }
]);