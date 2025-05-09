import React, { useEffect, useRef, useState } from 'react';

const MapComponent = ({ pickupLocation, dropoffLocation, onLocationSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      if (!window.google || !mapRef.current) return;

      // Center on Haiti by default
      const defaultCenter = { lat: 18.9712, lng: -72.2852 }; // Port-au-Prince coordinates
      
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });

      // Initialize DirectionsRenderer
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#4F46E5',
          strokeWeight: 5,
        },
      });

      setMap(mapInstance);
      setDirectionsRenderer(directionsRendererInstance);

      // Add click listener for location selection
      mapInstance.addListener('click', (e) => {
        const location = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };

        // If no pickup location is set, set it first
        if (!pickupLocation) {
          onLocationSelect('pickup', location);
        } else if (!dropoffLocation) {
          onLocationSelect('dropoff', location);
        }
      });
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', initMap);
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup markers when component unmounts
      markers.forEach(marker => marker.setMap(null));
    };
  }, []);

  // Update markers and route when locations change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];

    if (pickupLocation) {
      const pickupMarker = new window.google.maps.Marker({
        position: pickupLocation,
        map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4F46E5" width="36px" height="36px">
              <circle cx="12" cy="12" r="10" fill="#4F46E5"/>
              <circle cx="12" cy="12" r="6" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(36, 36),
          anchor: new window.google.maps.Point(18, 18),
        },
        title: 'Point de départ',
      });
      newMarkers.push(pickupMarker);
    }

    if (dropoffLocation) {
      const dropoffMarker = new window.google.maps.Marker({
        position: dropoffLocation,
        map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DC2626" width="36px" height="36px">
              <path d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(36, 36),
          anchor: new window.google.maps.Point(18, 36),
        },
        title: 'Destination',
      });
      newMarkers.push(dropoffMarker);
    }

    setMarkers(newMarkers);

    // If both locations are set, show route
    if (pickupLocation && dropoffLocation && directionsRenderer) {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: pickupLocation,
          destination: dropoffLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            // Fit map to show entire route
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(pickupLocation);
            bounds.extend(dropoffLocation);
            map.fitBounds(bounds);
          }
        }
      );
    } else if (pickupLocation) {
      // Center on pickup location if only that is set
      map.setCenter(pickupLocation);
      map.setZoom(15);
    }
  }, [pickupLocation, dropoffLocation, map, directionsRenderer]);

  return (
    <div className="relative h-full rounded-lg overflow-hidden">
      <div ref={mapRef} className="h-full w-full"></div>
      
      {/* Instructions Overlay */}
      {!pickupLocation && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
          <p className="text-sm text-gray-600">
            <i className="fas fa-info-circle mr-2"></i>
            Cliquez sur la carte pour définir le point de départ
          </p>
        </div>
      )}
      {pickupLocation && !dropoffLocation && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
          <p className="text-sm text-gray-600">
            <i className="fas fa-info-circle mr-2"></i>
            Cliquez pour définir la destination
          </p>
        </div>
      )}

      {/* Legend */}
      {(pickupLocation || dropoffLocation) && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
          <div className="space-y-2">
            {pickupLocation && (
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm text-gray-600">Point de départ</span>
              </div>
            )}
            {dropoffLocation && (
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
                <span className="text-sm text-gray-600">Destination</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
