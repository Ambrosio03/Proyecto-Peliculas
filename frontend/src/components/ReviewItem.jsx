import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReseñasContext } from '../context/reseñasContext';
import { AuthContext } from '../context/AuthContext';
import { ToasterContext } from '../context/ToastContext'; // Corregida la importación

// ... resto del código igual ...

const ReviewItem = ({ reseña }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { deleteReseña } = useContext(ReseñasContext);
    const { user } = useContext(AuthContext);
    const showToast = useContext(ToasterContext);

   
    if (!reseña) {
        return null;
    }

    
    const {
        id,
        userId,
        userName = 'Usuario',
        movieId,
        movieTitle = 'Película',
        valoracion = 0,
        comentario = '',
        fecha = new Date().toISOString()
    } = reseña;

   
    const getInitial = (name) => {
        if (typeof name !== 'string' || !name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
            deleteReseña(id);
            showToast.reviewDeleted();
        }
    };

    const formatDate = (dateString) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        } catch (error) {
            return 'Fecha no disponible';
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
                {/* Cabecera con título y botón de eliminar */}
                <div className="flex justify-between items-start mb-4">
                    <Link 
                        to={`/movies/${movieId}`}
                        className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        {movieTitle}
                    </Link>
                    {user && user.id === userId && (
                        <button
                            onClick={handleDelete}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-700"
                            title="Eliminar reseña"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-5 w-5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Info del usuario y valoración */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                                {getInitial(userName)}
                            </span>
                        </div>
                        <div>
                            <p className="text-white">{userName}</p>
                            <p className="text-sm text-gray-400">{formatDate(fecha)}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white">{valoracion}/10</span>
                    </div>
                </div>

                {/* Contenido de la reseña */}
                <div className="text-gray-300">
                    <p className={isExpanded ? '' : 'line-clamp-3'}>
                        {comentario}
                    </p>
                    {comentario.length > 150 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                            {isExpanded ? 'Leer menos' : 'Leer más'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;

