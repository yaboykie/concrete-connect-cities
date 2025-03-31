
import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  latitude: number | null;
  longitude: number | null;
  city: string;
  state: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ latitude, longitude, city, state }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only try to initialize the map if we have valid coordinates
    if (latitude && longitude && mapRef.current) {
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
      };
      
      const map = new google.maps.Map(mapRef.current, mapOptions);
      
      // Add a marker at the center location
      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: `${city}, ${state}`,
      });
    }
  }, [latitude, longitude, city, state]);
  
  // Display a fallback if coordinates aren't available
  if (!latitude || !longitude) {
    return (
      <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md p-6 bg-gray-50 text-center">
        <h3 className="text-xl font-semibold mb-3">Our Service Area Covers All of {city}</h3>
        <p className="text-lg mb-4">
          🗺️ Our local concreters cover every neighborhood in {city} and surrounding areas.
        </p>
        <p className="text-sm text-gray-600">
          Get matched with pros who know the specific requirements of your area.
        </p>
      </div>
    );
  }
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-80 rounded-lg overflow-hidden border border-gray-300 shadow-md"
    ></div>
  );
};

export default GoogleMap;
