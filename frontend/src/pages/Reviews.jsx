import { useContext } from 'react';
import { ReseñasContext } from '../context/reseñasContext';
import { AuthContext } from '../context/AuthContext';
import ReviewItem from '../components/ReviewItem';

const Reviews = () => {
    const { reseñas } = useContext(ReseñasContext);
   

    
    const sortedReviews = [...reseñas].sort((a, b) => 
        new Date(b.fecha) - new Date(a.fecha)
    );

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Todas las Reseñas
                    </h1>
                    <p className="text-gray-400">
                        Total de reseñas: {sortedReviews.length}
                    </p>
                </div>

                {/* Lista de Reseñas */}
                <div className="space-y-6">
                    {sortedReviews.length > 0 ? (
                        sortedReviews.map((reseña) => (
                            <ReviewItem 
                                key={reseña.id} 
                                reseña={reseña}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-800 rounded-xl">
                            <p className="text-gray-400 text-lg mb-2">
                                No hay reseñas disponibles
                            </p>
                            <p className="text-gray-500">
                                ¡Sé el primero en escribir una reseña!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;