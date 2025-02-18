import { useReseñas } from "../context/reseñasContext";

const ReviewItem = ({ id, texto, calificacion, movieTitle ,fecha}) => {
  const { removeReseña } = useReseñas();

  const removeReview = (id) => {
    removeReseña(id);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white relative">
      <button
        onClick={() =>removeReview(id)}
        className="absolute top-2 right-2 mb-5 py-1 px-2 rounded-full z-10 text-white"
      >
        🗑️
      </button>
      <h3 className="text-lg font-semibold">{movieTitle}</h3>
      <p className="text-gray-300 mt-2">{texto}</p>
      <p className="mt-2 font-bold">Calificación: {calificacion} ⭐</p>
      <p className="text-gray-300 mt-2">Fecha: {fecha}</p>
    </div>
  );
};

export default ReviewItem;
