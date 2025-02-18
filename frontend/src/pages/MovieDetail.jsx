import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImageUrl, getMovieDetails, getMovieVideos} from "../services/tmdb";
import FormReview from "../components/FormReview";

const CardDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [reviews, setReviews] = useState([]);

  
  
  

  const fetchData = async () => {
    if (!id) return;

    try {
      const result = await getMovieDetails(id);
      setMovie(result);
      
      const trailerResult = await getMovieVideos(id);
      if (trailerResult.results && trailerResult.results.length > 0) {
        setTrailer(trailerResult.results[0]); 
      } else {
        console.log("No se encontró ningún tráiler.");
      }

      // Obtener las reseñas del localStorage
      const storedReviews = JSON.parse(localStorage.getItem('reseñas')) || [];
      // Filtrar las reseñas para mostrar solo las de la película actual
      const movieReviews = storedReviews.filter(review => review.movieId === id);
      setReviews(movieReviews);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!movie) return <p>Cargando...</p>;

  return (
    <div className="relative min-h-screen text-white p-6">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${getImageUrl(movie.backdrop_path)})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 bg-black/70 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-32">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Póster */}
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-64 h-auto rounded-lg shadow-md object-cover"
          />
          
          {/* Información de la película */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-300 mb-4">{movie.release_date}</p>
            <p className="text-gray-200 mb-4">⭐ {movie.vote_average.toFixed(1)} </p>
            <p className="text-gray-200 mb-4">{movie.overview}</p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Géneros</h3>
              <p className="text-gray-300">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>  
        </div>

        {trailer && trailer.key && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Trailer Oficial</h3>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Formulario de reseña */}
        <div className="mt-8">
          <FormReview id={id}/>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Reseñas</h3>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-300 mb-2">{review.texto}</p>
                  <p className="text-sm text-gray-400">Calificacion: {review.calificacion} ⭐</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No hay reseñas disponibles para esta película.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardDetail;
