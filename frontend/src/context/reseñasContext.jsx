import { createContext, useContext, useEffect, useState } from "react";

const ReseñasContext = createContext();

export function ReseñasProvider({ children }){
    const [reseñas, setReseñas] = useState([]);

    useEffect(() => {
      const storedReseñas = localStorage.getItem("reseñas");
      if (storedReseñas) {
        setReseñas(JSON.parse(storedReseñas));
      }
    }, [])

    const addReseña = (reseña) => {
        setReseñas((prevReseñas) => {
            const updatedReseñas = [...prevReseñas, reseña];
            localStorage.setItem("reseñas", JSON.stringify(updatedReseñas));
            return updatedReseñas;
        });
    };
    

    const removeReseña = (reseñaId) => {
        const updatedReseñas = reseñas.filter(r => r.id !== reseñaId);
        setReseñas(updatedReseñas);
        localStorage.setItem("reseñas", JSON.stringify(updatedReseñas));
    }

    return (
        <ReseñasContext.Provider value={{reseñas,addReseña,removeReseña}}>
            {children}
        </ReseñasContext.Provider>
    )

    
}
export const useReseñas = () => {
    const context = useContext(ReseñasContext);
    if (!context) {
        throw new Error("useReseñas debe estar dentro del proveedor de reseñas");
    }
    return context;
}