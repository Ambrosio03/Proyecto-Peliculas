import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMoviesWithFilters, getGenres } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

const MovieList = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        year: '',
        genre: '',
        rating: '',
        page: 1
    });

    // Generar años desde 1990 hasta el año actual
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1990 + 1 },
        (_, i) => currentYear - i
    );

    // Ratings del 1 al 10
    const ratings = Array.from({ length: 10 }, (_, i) => i + 1);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const data = await getMoviesWithFilters(filters);
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
            setLoading(false);
        };
        fetchMovies();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
            page: 1 
        }));
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movies/${movieId}`);
    };

    return (
        <div className="p-5">
            <div className="flex flex-wrap gap-5 mb-8">
                <select 
                    name="year" 
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-base min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Todos los años</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <select 
                    name="genre" 
                    value={filters.genre}
                    onChange={handleFilterChange}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-base min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Todos los géneros</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <select 
                    name="rating" 
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-base min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">Todas las valoraciones</option>
                    {ratings.map(rating => (
                        <option key={rating} value={rating}>
                            {rating}+ estrellas
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-5 text-lg">
                    Cargando películas...
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                    {movies.map(movie => (
                        <div key={movie.id} className="relative">
                            <MovieCard 
                                movie={movie} 
                                onMovieClick={() => handleMovieClick(movie.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList;