import { useState } from "react";
import { Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch";
import { getPopularMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";



const Home = () => {
    
    const [page, setPage] = useState(1);
    
    const {data, error, isLoading} = useFetch(()=>getPopularMovies(page), [page])
    
    const handlePageChange = (newPage) => {
        window.scrollTo( {top:0, behavior: "smooth"})
        setPage(newPage)
    }
    
    if(error){
        return <div className="text-center">
            <h2 className=" text-red-600 font-bold text-2xl">Error</h2>
            <p className="text-2xl font-medium">{error.message}</p>
            <Link to='/' className="text-blue-600">Volver</Link>
        </div>
    }
  return (
    <div className="space-y-8">
        <header className="text-center">
        <h1 className="text-4xl font-bold text-sky-950">Bienvenido al VideoClub</h1>
        <p className="text-lg font-medium text-sky-900 mt-2">
            Descubre las peliculas mas populares del momento
        </p>
        </header>
        <section >
            <h2 className="text-2xl font-bold text-sky-950 mb-10">Peliculas Populares</h2>
            {isLoading ? (<Spinner/>) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {data?.results.map((movie,index) => (
                        <MovieCard key={index} movie={movie}/>
                    ))}
                </div>
            )}
            <div className="flex justify-center gap-2">
                <button 
                onClick={() =>handlePageChange(page-1)}
                disabled={page ===1}
                className="px-4 py-2 rounded-lg transition-colors duration-200 bg-sky-800 hover:bg-sky-950 text-white">
                    anterior
                </button>
                <span>
                   Pagina {page} de {data?.total_pages}
                </span>
                <button 
                onClick={() =>handlePageChange(page+1)}
                disabled={page === data?.total_pages}
                className="px-4 py-2 rounded-lg transition-colors duration-200 bg-sky-800 hover:bg-sky-950 text-white" >
                    siguiente
                </button>

            </div>

        </section>
    </div>
  )
}

export default Home