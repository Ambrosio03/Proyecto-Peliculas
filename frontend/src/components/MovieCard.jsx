import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/tmdb";
import { useFavorites } from "../context/FavoritesContext";

const MovieCard = (props) => {
  const { movie } = props;
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  const handleMovieClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const handleFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <article className="relative bg-white rounded-lg transform transition-transform duration-300 hover:scale-105 shadow-lg">
      <button
        onClick={handleFavorites}
        className={`absolute top-2 left-2 py-1 px-2 rounded-full z-10 ${
          isFavorite(movie.id) ? "bg-red-400" : "bg-black bg-opacity-50"
        } text-white`}
      >
        {isFavorite(movie.id) ? "💔" : "♥️"} 
      </button>

      <div onClick={handleMovieClick} className="cursor-pointer">
        <div className="relative aspect-[2/3]">
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white py-1 px-2 rounded">
            ⭐ {rating}
          </div>
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-2 text-gray-500">{movie.title}</h3>
          <p className="text-sm text-gray-300">{movie.release_date}</p>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
