
import React from 'react';

interface GoogleMapProps {
  latitude: number | null;
  longitude: number | null;
  googleMapEmbed: string | null;
  city: string;
  state: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ latitude, longitude, googleMapEmbed, city, state }) => {
  // Default map URL format for Cambridge, MA if none provided from database
  const defaultMapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBATry73Y3XzqcZiexYUjBvP14M7LKBeDQ&q=${city},${state}`;
  
  // Use the googleMapEmbed from Supabase if available, otherwise use the default
  const mapUrl = googleMapEmbed || defaultMapUrl;
  
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-300 shadow-md">
      <iframe
        src={mapUrl}
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map of ${city}, ${state}`}
        className="w-full"
      ></iframe>
      <div className="bg-white p-4 border-t border-gray-300">
        <h3 className="text-lg font-semibold mb-1">Our Service Area</h3>
        <p className="text-gray-600">
          We provide concrete driveway services throughout {city}, {state} and surrounding areas.
        </p>
      </div>
    </div>
  );
};

export default GoogleMap;
