import { useState, useContext } from 'react';
import { ReseñasContext } from '../context/reseñasContext';
import { AuthContext } from '../context/AuthContext';
import { ToasterContext } from '../context/ToastContext';

const FormReview = ({ movieId, movieTitle }) => {
    const { user } = useContext(AuthContext);
    const { addReseña } = useContext(ReseñasContext);
    const showToast = useContext(ToasterContext);
    const [valoracion, setValoracion] = useState(5);
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!user) {
            alert('Debes iniciar sesión para dejar una reseña');
            return;
        }

        const nuevaReseña = {
            id: Date.now(),
            movieId: Number(movieId), 
            movieTitle,
            userId: user.id,
            userName: user.name,
            valoracion: Number(valoracion),
            comentario,
            fecha: new Date().toISOString()
        };

        console.log('Nueva reseña:', nuevaReseña); 
        addReseña(nuevaReseña);
        showToast.reviewAdded(movieTitle);
        
       
        setComentario('');
        setValoracion(5);
    };

    return (
        <>
            {/* Formulario de reseña */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Agregar Reseña</h3>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <textarea
                        name="reseña"
                        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="4"
                        placeholder="Escribe tu reseña aquí..."
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    ></textarea>
                    <div className="mt-2 flex items-center">
                        <label className="mr-2">Calificación:</label>
                        <select name="calificacion" className="bg-gray-800 text-white p-2 rounded-md" value={valoracion} onChange={(e) => setValoracion(e.target.value)}>
                            {[1, 2, 3, 4, 5, 6,7 , 8 , 9 , 10].map((star) => (
                                <option key={star} value={star}>{star} ⭐</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit"
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Enviar Reseña
                    </button>
                </form>
            </div>
        </>
    )
}

export default FormReview