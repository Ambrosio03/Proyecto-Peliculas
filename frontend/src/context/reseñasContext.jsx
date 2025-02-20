import { createContext, useContext, useEffect, useState } from "react";

export const ReseñasContext = createContext();

export const ReseñasProvider = ({ children }) => {
    const [reseñas, setReseñas] = useState(() => {
        const savedReseñas = localStorage.getItem('reseñas');
        return savedReseñas ? JSON.parse(savedReseñas) : [];
    });

    useEffect(() => {
        localStorage.setItem('reseñas', JSON.stringify(reseñas));
    }, [reseñas]);

    const addReseña = (nuevaReseña) => {
        console.log('Añadiendo reseña:', nuevaReseña); // Debug
        setReseñas(prevReseñas => [...prevReseñas, nuevaReseña]);
    };

    const deleteReseña = (reseñaId) => {
        setReseñas(prevReseñas => prevReseñas.filter(reseña => reseña.id !== reseñaId));
    };

    const updateReseña = (reseñaId, updatedReseña) => {
        setReseñas(prevReseñas => 
            prevReseñas.map(reseña => 
                reseña.id === reseñaId ? { ...reseña, ...updatedReseña } : reseña
            )
        );
    };

    return (
        <ReseñasContext.Provider value={{ reseñas, addReseña, deleteReseña, updateReseña }}>
            {children}
        </ReseñasContext.Provider>
    );
};

export const useReseñas = () => {
    const context = useContext(ReseñasContext);
    if (!context) {
        throw new Error("useReseñas debe estar dentro del proveedor de reseñas");
    }
    return context;
}