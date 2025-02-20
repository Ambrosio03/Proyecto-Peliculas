const VITE_API_TOKEN= import.meta.env.VITE_API_TOKEN;
 const VITE_BASE_URL= import.meta.env.VITE_BASE_URL;
const VITE_BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;


//ojeto que me decide el tamañp de las imagenes
export const IMAGES_SIZES = {
    POSTER:"w500",
    BACKDROP:"original",
}

// FUNCIONES QUE VOY A CREAR PARA LA API

// FUNCION PARA OBTENER UNA URL DE UNA IMAGEN

export const getImageUrl = (path, size = IMAGES_SIZES.POSTER) => {
    if(!path) return "placeholder-movie.jpg";
    return `${VITE_BASE_IMAGE_URL}/${size}/${path}`;
}

const fetchFromApi = async (endpoint, options = {}) => {
    try {
        const response = await fetch(
            `${VITE_BASE_URL}${endpoint}?api_key=${VITE_API_TOKEN}&language=es-ES&${new URLSearchParams(options)}`
        );
        if (!response.ok) {
            throw new Error(`Error fetching data from ${endpoint}: ${response.status}`);
        }
        return await response.json();

    } catch(e) {
        console.error(e);
        throw e; // Propagar el error en lugar de devolverlo
    }
}

export const getPopularMovies = async (page=1) => {
    return fetchFromApi("/movie/popular",{page});
}

export const getMovieDetails = async (movieId) => {
    return fetchFromApi(`/movie/${movieId}`, {
        append_to_response: 'credits,videos,similar'
    });
}

//busqueda de una pelicula

export const searchMovies = async (query,page = 1) => {
    return fetchFromApi(`/search/movie`,{query,page});
}

export const getMovieVideos = async (movieId) => {
    return fetchFromApi(`/movie/${movieId}/videos`);
}

// Añadir función para obtener géneros
export const getGenres = async () => {
    return fetchFromApi("/genre/movie/list");
}

// Función para obtener películas con filtros
export const getMoviesWithFilters = async (filters = {}) => {
    const { year, genre, rating, page = 1 } = filters;
    const options = {
        page,
        with_genres: genre || '',
        'vote_average.gte': rating || '',
        year: year || '',
        sort_by: 'popularity.desc'
    };
    
    return fetchFromApi("/discover/movie", options);
}

