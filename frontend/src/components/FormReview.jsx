
import { useReseñas } from '../context/reseñasContext';

const FormReview = ({ id }) => {
    const { addReseña } = useReseñas();
  return (
<>
    {/* Formulario de reseña */}
    <div className="mt-6">
    <h3 className="text-lg font-semibold">Agregar Reseña</h3>
    <form className="mt-4" onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nuevaReseña = {
          id: Date.now(),
          movieId: id, 
          texto: formData.get("reseña"),
          calificacion: formData.get("calificacion"),
        };
        addReseña(nuevaReseña);
        e.target.reset();
      }}>
      <textarea
        name="reseña"
        className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        rows="4"
        placeholder="Escribe tu reseña aquí..."
      ></textarea>
      <div className="mt-2 flex items-center">
        <label className="mr-2">Calificación:</label>
        <select name="calificacion" className="bg-gray-800 text-white p-2 rounded-md">
          {[1, 2, 3, 4, 5, 6,7 , 8 , 9 , 10].map((star) => (
            <option key={star} value={star}>{star} ⭐</option>
          ))}
        </select>
      </div>
      <button 
        type="submit"
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Enviar Reseña
      </button>
    </form>
  </div>
  </>
  )
}

export default FormReview