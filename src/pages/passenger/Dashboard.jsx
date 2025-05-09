import React, { useState } from 'react';
import MapComponent from '../../components/MapComponent';
import NegotiationModal from '../../components/NegotiationModal';

const PassengerDashboard = () => {
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);

  const handleLocationSelect = (type, location) => {
    if (type === 'pickup') {
      setPickupLocation(location);
    } else {
      setDropoffLocation(location);
    }
  };

  const handleRequestRide = () => {
    if (pickupLocation && dropoffLocation) {
      setSelectedRide({
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        estimatedDistance: '5.2 km', // This would be calculated based on actual route
        estimatedDuration: '15 mins',
      });
      setIsNegotiating(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - User Info & History */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <i className="fas fa-user text-gray-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Jean Baptiste</h3>
                  <p className="text-gray-500">Passager</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Note</span>
                  <span className="font-semibold">4.8 <i className="fas fa-star text-yellow-400"></i></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trajets complétés</span>
                  <span className="font-semibold">23</span>
                </div>
              </div>
            </div>

            {/* Recent Rides */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Trajets récents</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((ride) => (
                  <div key={ride} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">Port-au-Prince → Pétion-Ville</p>
                        <p className="text-sm text-gray-500">Il y a 2 jours</p>
                      </div>
                      <span className="font-semibold">1250 HTG</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="fas fa-user mr-2"></i>
                      <span>Pierre Richard</span>
                      <span className="mx-2">•</span>
                      <i className="fas fa-star text-yellow-400"></i>
                      <span>4.9</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Map & Location Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Demander un trajet</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Point de départ
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Entrez votre position"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-map-marker-alt text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Où allez-vous?"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-map-marker text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Component */}
              <div className="h-[400px] bg-gray-100 rounded-lg mb-6">
                <MapComponent
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  onLocationSelect={handleLocationSelect}
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleRequestRide}
                disabled={!pickupLocation || !dropoffLocation}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Demander un chauffeur
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation Modal */}
      {isNegotiating && selectedRide && (
        <NegotiationModal
          ride={selectedRide}
          onClose={() => setIsNegotiating(false)}
        />
      )}

      {/* Emergency Button - Fixed Position */}
      <button className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        <i className="fas fa-exclamation-triangle text-xl"></i>
      </button>
    </div>
  );
};

export default PassengerDashboard;
