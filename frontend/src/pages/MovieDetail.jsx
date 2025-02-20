import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdb';
import { ReseñasContext } from '../context/reseñasContext';
import { AuthContext } from '../context/AuthContext';
import FormReview from '../components/FormReview';
import ReviewItem from '../components/ReviewItem';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { reseñas } = useContext(ReseñasContext);
    

    useEffect(() => {
        const fetchMovieDetails = async () => {
            console.log('Fetching movie details for ID:', id); 
            setLoading(true);
            try {
                const data = await getMovieDetails(id);
                console.log('Movie data received:', data); 
                setMovie(data);
            } catch (err) {
                console.error('Error fetching movie:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

   
    const movieId = parseInt(id);
    const movieReviews = reseñas.filter(reseña => reseña.movieId === movieId);

    const sortedReviews = [...movieReviews].sort((a, b) => 
        new Date(b.fecha) - new Date(a.fecha)
    );

    console.log('ID de película:', movieId); // Debug
    console.log('Todas las reseñas:', reseñas); // Debug
    console.log('Reseñas filtradas:', movieReviews); // Debug

    // Debug logs
    console.log('Current state:', { loading, error, movie });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-white text-2xl">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-white text-2xl">Error: {error}</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-white text-2xl">No se encontró la película</div>
            </div>
        );
    }

    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            <div className="relative h-[70vh] w-full">
                {backdropUrl && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ 
                            backgroundImage: `url(${backdropUrl})`,
                            backgroundPosition: 'center 20%'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70"></div>
                    </div>
                )}

                {/* Contenido Principal */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Poster */}
                            {posterUrl && (
                                <div className="w-64 flex-shrink-0 mx-auto md:mx-0">
                                    <img 
                                        src={posterUrl} 
                                        alt={movie.title}
                                        className="rounded-lg shadow-2xl ring-1 ring-gray-700"
                                    />
                                </div>
                            )}

                            {/* Info Básica */}
                            <div className="flex-grow text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    {movie.title}
                                </h1>
                                
                                <div className="mb-6 text-gray-300 text-lg">
                                    {movie.release_date && (
                                        <span>{new Date(movie.release_date).getFullYear()}</span>
                                    )}
                                    {movie.runtime && (
                                        <>
                                            <span className="mx-3">•</span>
                                            <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                                        </>
                                    )}
                                    {movie.vote_average && (
                                        <>
                                            <span className="mx-3">•</span>
                                            <span className="text-yellow-400">★</span>
                                            <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
                                        </>
                                    )}
                                </div>

                                {/* Géneros */}
                                {movie.genres && movie.genres.length > 0 && (
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                                        {movie.genres.map(genre => (
                                            <span 
                                                key={genre.id}
                                                className="px-4 py-1.5 bg-gray-800/80 text-gray-300 rounded-full text-sm font-medium"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido Detallado */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Sinopsis */}
                {movie.overview && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Sinopsis
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>
                )}

                {/* Reparto */}
                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Reparto Principal
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {movie.credits.cast.slice(0, 5).map(actor => (
                                <div 
                                    key={actor.id} 
                                    className="bg-gray-800 rounded-lg p-4 text-center"
                                >
                                    {actor.profile_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                            alt={actor.name}
                                            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/185x185?text=No+Image';
                                            }}
                                        />
                                    )}
                                    <p className="text-white font-medium">{actor.name}</p>
                                    <p className="text-gray-400 text-sm mt-1">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Videos/Trailers si están disponibles */}
                {movie.videos?.results && movie.videos.results.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Trailers y Videos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {movie.videos.results.slice(0, 2).map(video => (
                                <div key={video.id} className="aspect-video">
                                    <iframe
                                        className="w-full h-full rounded-lg"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title={video.name}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Formulario de Reseña */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Escribe tu reseña
                    </h2>
                    <div className="bg-gray-800 rounded-lg p-6">
                        <FormReview 
                            movieId={movieId}
                            movieTitle={movie.title} 
                        />
                    </div>
                </div>

                {/* Lista de Reseñas */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Reseñas de usuarios ({sortedReviews.length})
                    </h2>
                    <div className="space-y-6">
                        {sortedReviews.length > 0 ? (
                            sortedReviews.map((reseña) => (
                                <ReviewItem 
                                    key={reseña.id} 
                                    reseña={reseña}
                                />
                            ))
                        ) : (
                            <div className="text-center py-12 bg-gray-800 rounded-lg">
                                <p className="text-gray-400 text-lg mb-2">
                                    No hay reseñas para esta película todavía
                                </p>
                                <p className="text-gray-500">
                                    ¡Sé el primero en dejar una reseña!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;