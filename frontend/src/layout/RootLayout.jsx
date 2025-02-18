import {  Outlet } from "react-router-dom"
import Navbar from "../components/NavBar"

const RootLayout = () => {
  return (
    //Contenedor principal
    <div className="min-h-screen bg-gray-100">
        <Navbar/>
        {/* Contenedor principal para el outlet */}
        <main className="max-w-7xl mx-auto px-4 py-6">
            <Outlet/>
        </main>
        <footer className="bg-sky-950 text-white text-center p-4">
            <div className="max-w-7xl mx-auto px-4  mt-auto">
                <p className="text-center">VideoClub © 2025</p>
            </div>
        </footer>
    </div>
  )
}

export default RootLayout