import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h2 className="text-4xl font-bold text-sky-950 mb-10">Mis películas favoritas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-center text-sky-600">No tienes películas favoritas</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;