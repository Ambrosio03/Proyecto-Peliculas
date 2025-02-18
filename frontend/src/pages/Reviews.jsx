import { useEffect, useState } from "react";
import ReviewItem from "../components/ReviewItem";
import { getMovieDetails } from "../services/tmdb"; 
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState({}); 

  useEffect(() => {
    const storedReviews = localStorage.getItem("reseñas");
    if (storedReviews) {
      const parsedReviews = JSON.parse(storedReviews);
      setReviews(parsedReviews);

      
      parsedReviews.forEach(async (review) => {
        if (!movies[review.movieId]) {
          const movieData = await getMovieDetails(review.movieId);
          setMovies((prev) => ({ ...prev, [review.movieId]: movieData.title }));
        }
      });
    }
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold text-sky-950 mb-10">Mis reseñas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {reviews.length > 0 ? 
            reviews.map((review, index) => (
              <ReviewItem 
                key={index} 
                id= {review.id}
                texto={review.texto} 
                calificacion={review.calificacion} 
                fecha={review.fecha}
                movieTitle={movies[review.movieId] || "Cargando..."}
              />
            ))
            :
            <p className="text-center text-sky-600">No tienes reseñas</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Reviews;
