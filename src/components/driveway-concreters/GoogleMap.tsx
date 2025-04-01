
import React from 'react';

interface GoogleMapProps {
  latitude: number | null;
  longitude: number | null;
  googleMapEmbed: string | null;
  city: string;
  state: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ latitude, longitude, googleMapEmbed, city, state }) => {
  // If we have a Google Map embed code from Supabase, use it
  if (googleMapEmbed) {
    return (
      <div className="w-full rounded-lg overflow-hidden border border-gray-300 shadow-md">
        <iframe
          src={googleMapEmbed}
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${city}, ${state}`}
        ></iframe>
      </div>
    );
  }
  
  // If we don't have an embed code but have coordinates, we could potentially create a map here
  // For now, we'll just create a visual placeholder
  if (latitude && longitude) {
    return (
      <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-300 shadow-md relative bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center flex-col p-6 text-center">
          <h3 className="text-xl font-bold mb-3">Serving All of {city}</h3>
          <p className="text-gray-700 mb-4">
            Our network of professional concreters covers all areas of {city} and surrounding areas.
          </p>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm text-brand-blue font-semibold">
            📍 {city}, {state} - Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </div>
        </div>
      </div>
    );
  }
  
  // Fallback for when we have neither embed code nor coordinates
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
};

export default GoogleMap;
