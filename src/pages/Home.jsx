import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-600 h-[600px]">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transport Négociable en Haïti
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Négociez directement avec les chauffeurs, voyagez en toute sécurité, et économisez de l'argent sur vos trajets.
            </p>
            <div className="space-x-4">
              <Link
                to="/register"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Commencer
              </Link>
              <Link
                to="/register?role=driver"
                className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Devenir Chauffeur
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-map-marker-alt text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choisissez votre destination</h3>
              <p className="text-gray-600">
                Indiquez votre point de départ et d'arrivée sur la carte
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments-dollar text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Négociez le prix</h3>
              <p className="text-gray-600">
                Discutez directement avec les chauffeurs pour obtenir le meilleur tarif
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-car text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Voyagez en sécurité</h3>
              <p className="text-gray-600">
                Profitez d'un trajet sûr avec des chauffeurs vérifiés
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Prêt à commencer?</h2>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Créer un compte gratuitement
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">À propos</h3>
              <p className="text-gray-400">
                InDriver Haiti est une plateforme de transport qui permet aux passagers de négocier directement avec les chauffeurs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/register" className="text-gray-400 hover:text-white">
                    S'inscrire
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white">
                    Se connecter
                  </Link>
                </li>
                <li>
                  <Link to="/register?role=driver" className="text-gray-400 hover:text-white">
                    Devenir chauffeur
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <i className="fas fa-envelope mr-2"></i>
                  support@indriverhaiti.com
                </li>
                <li className="text-gray-400">
                  <i className="fas fa-phone mr-2"></i>
                  +509 xxxx-xxxx
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 InDriver Haiti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
