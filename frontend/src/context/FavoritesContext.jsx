import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { ToasterContext } from './ToastContext';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const showToast = useContext(ToasterContext);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const addToFavorites = (movie) => {
        setFavorites(prevFavorites => {
            if (!prevFavorites.some(fav => fav.id === movie.id)) {
                showToast.favoriteAdded(movie.title);
                return [...prevFavorites, movie];
            }
            return prevFavorites;
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prevFavorites => {
            const movie = prevFavorites.find(fav => fav.id === movieId);
            if (movie) {
                showToast.favoriteRemoved(movie.title);
            }
            return prevFavorites.filter(fav => fav.id !== movieId);
        });
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    return (
        <FavoritesContext.Provider value={{ 
            favorites, 
            addToFavorites, 
            removeFromFavorites, 
            isFavorite 
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites debe ser usado dentro de un FavoritesProvider");
    }
    return context;
};
