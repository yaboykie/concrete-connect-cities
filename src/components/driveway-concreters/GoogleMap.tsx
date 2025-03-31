
import React from 'react';

interface GoogleMapProps {
  latitude: number | null;
  longitude: number | null;
  city: string;
  state: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ latitude, longitude, city, state }) => {
  if (!latitude || !longitude) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Map of {city}, {state} not available</p>
      </div>
    );
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${city},${state}&zoom=12&maptype=roadmap`;
  
  return (
    <div className="aspect-video rounded-lg overflow-hidden shadow-md">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
        title={`Map of ${city}, ${state}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
