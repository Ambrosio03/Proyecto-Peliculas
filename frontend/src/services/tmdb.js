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
    try{
        const response = await fetch(`${VITE_BASE_URL}${endpoint}?api_key=${VITE_API_TOKEN}&languaje=es-ES&${new URLSearchParams(options)}`);
        if(!response.ok){
            throw new Error(`Error fetching data from ${endpoint}: ${response.status}`);
        }
        return await response.json();

    }catch(e){
        console.error(e);
        return e
    }
}

export const getPopularMovies = async (page=1) => {
    return fetchFromApi("/movie/popular",{page});
}

export const getMovieDetails = async (movieId) => {
    return fetchFromApi(`/movie/${movieId}`);
}

//busqueda de una pelicula

export const searchMovies = async (query,page = 1) => {
    return fetchFromApi(`/search/movie`,{query,page});
}

export const getMovieVideos = async (movieId) => {
    return fetchFromApi(`/movie/${movieId}/videos`);
}

