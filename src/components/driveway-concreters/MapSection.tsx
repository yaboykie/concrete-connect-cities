
import React from 'react';
import GoogleMap from './GoogleMap';
import { LocationContentType } from './types';

interface MapSectionProps {
  locationContent: LocationContentType;
  city: string;
  state: string;
}

const MapSection: React.FC<MapSectionProps> = ({ locationContent, city, state }) => {
  return (
    <section className="section bg-white py-12" id="map-section">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Our Service Area in {locationContent.fullLocation}
        </h2>
        <div className="max-w-5xl mx-auto">
          <GoogleMap 
            latitude={locationContent.latitude} 
            longitude={locationContent.longitude}
            googleMapEmbed={locationContent.googleMapEmbed}
            city={city}
            state={state}
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
