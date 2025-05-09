import React, { useState } from 'react';
import MapComponent from '../../components/MapComponent';
import NegotiationModal from '../../components/NegotiationModal';

const DriverDashboard = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Simulated nearby requests
  const nearbyRequests = [
    {
      id: 1,
      passenger: {
        name: 'Marie Claire',
        rating: 4.8,
        trips: 15,
      },
      pickup: { lat: 18.9712, lng: -72.2852 },
      dropoff: { lat: 18.9712, lng: -72.2852 },
      distance: '3.2 km',
      estimatedDuration: '12 mins',
      timestamp: new Date(),
    },
    {
      id: 2,
      passenger: {
        name: 'Jean Michel',
        rating: 4.9,
        trips: 23,
      },
      pickup: { lat: 18.9712, lng: -72.2852 },
      dropoff: { lat: 18.9712, lng: -72.2852 },
      distance: '5.7 km',
      estimatedDuration: '20 mins',
      timestamp: new Date(),
    },
  ];

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
  };

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
    setIsNegotiating(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Driver Info & Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              {/* Driver Profile */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-user text-gray-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Pierre Joseph</h3>
                  <p className="text-gray-500">Chauffeur</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-500">Note</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">127</div>
                  <div className="text-sm text-gray-500">Trajets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-500">Acceptation</div>
                </div>
              </div>

              {/* Availability Toggle */}
              <button
                onClick={handleAvailabilityToggle}
                className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                  isAvailable
                    ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
                }`}
              >
                <i className={`fas fa-${isAvailable ? 'toggle-on' : 'toggle-off'} mr-2`}></i>
                {isAvailable ? 'Disponible' : 'Non disponible'}
              </button>
            </div>

            {/* Vehicle Info */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Véhicule</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">Toyota Corolla</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Année</span>
                  <span className="font-medium">2019</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plaque</span>
                  <span className="font-medium">AA-23456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Couleur</span>
                  <span className="font-medium">Gris</span>
                </div>
              </div>
            </div>

            {/* Today's Stats */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Aujourd'hui</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-500">Trajets</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">4500</div>
                  <div className="text-sm text-gray-500">HTG</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Map & Requests */}
          <div className="lg:col-span-2">
            {/* Map */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="h-[400px] bg-gray-100 rounded-lg">
                <MapComponent />
              </div>
            </div>

            {/* Nearby Requests */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Demandes à proximité</h3>
              {isAvailable ? (
                <div className="space-y-4">
                  {nearbyRequests.map((request) => (
                    <div
                      key={request.id}
                      className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => handleRequestSelect(request)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <i className="fas fa-user text-gray-500"></i>
                          </div>
                          <div>
                            <h4 className="font-medium">{request.passenger.name}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <i className="fas fa-star text-yellow-400 mr-1"></i>
                              <span>{request.passenger.rating}</span>
                              <span className="mx-2">•</span>
                              <span>{request.passenger.trips} trajets</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          il y a {Math.floor(Math.random() * 5) + 1} mins
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <i className="fas fa-map-marker-alt text-green-500 mr-2"></i>
                          <span>Delmas 60</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <i className="fas fa-map-marker text-red-500 mr-2"></i>
                          <span>Pétion-Ville</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                        <div>
                          <i className="fas fa-route mr-1"></i>
                          {request.distance}
                        </div>
                        <div>
                          <i className="fas fa-clock mr-1"></i>
                          {request.estimatedDuration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="h-12 w-12 mx-auto mb-4 text-gray-400">
                    <i className="fas fa-car-side text-4xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Vous êtes hors ligne
                  </h3>
                  <p className="text-gray-500">
                    Activez votre disponibilité pour voir les demandes de courses
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation Modal */}
      {isNegotiating && selectedRequest && (
        <NegotiationModal
          ride={selectedRequest}
          onClose={() => {
            setIsNegotiating(false);
            setSelectedRequest(null);
          }}
        />
      )}
    </div>
  );
};

export default DriverDashboard;
