
import React from 'react';

interface GoogleMapProps {
  latitude: number | null;
  longitude: number | null;
  city: string;
  state: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ latitude, longitude, city, state }) => {
  // Instead of initializing an actual Google map (which requires API key),
  // we'll create a visual placeholder that looks like a map area
  
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
    <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-300 shadow-md relative bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center">
        <h3 className="text-xl font-bold mb-3">Serving All of {city}</h3>
        <p className="text-gray-700 mb-4">
          Our network of professional concreters covers all areas of {city} and surrounding areas.
        </p>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm text-brand-blue font-semibold">
          📍 {city}, {state}
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
