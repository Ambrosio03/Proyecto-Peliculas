import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Sección izquierda del nav */}
          <div className="flex items-center">
            <NavLink to="/home" className="text-lg font-bold">
              VideoClub
            </NavLink>
            <div className="flex space-x-4 ml-8">
              <NavLink to="/movies" className="hover:text-amber-600">Películas</NavLink>
              <NavLink to="/search" className="hover:text-amber-600">Buscar</NavLink>
              <NavLink to="/reviews" className="hover:text-amber-600">Reviews</NavLink>
              <NavLink to="/favorites" className="hover:text-amber-600">Favoritos</NavLink>
            </div>
          </div>
          {/* Sección derecha del nav */}
          <div className="flex items-center">
            {user && (
              <>
                <span className="mr-4">Hola, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;