import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return `/${user.role}/dashboard`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <i className="fas fa-car-side text-2xl text-blue-600 mr-2"></i>
              <span className="font-bold text-xl text-gray-800">InDriver Haiti</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to={getDashboardLink()}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Tableau de bord
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <i className="fas fa-user"></i>
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="fas fa-user-circle mr-2"></i>
                      Profil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </div>
                <Link
                  to={getDashboardLink()}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Tableau de bord
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
