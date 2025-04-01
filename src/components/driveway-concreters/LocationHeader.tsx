
import React from 'react';
import { LocationContentType } from './types';
import LocationBreadcrumb from './LocationBreadcrumb';

interface LocationHeaderProps {
  locationContent: LocationContentType;
  city: string;
  state: string;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({ locationContent, city, state }) => {
  return (
    <div className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <LocationBreadcrumb 
          city={city} 
          state={state} 
          fullLocation={locationContent.fullLocation} 
        />
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Find Top Driveway Concreters in {locationContent.fullLocation}
        </h1>
        
        <p className="text-xl text-gray-200 mb-8 max-w-4xl">
          Get matched with experienced, reliable driveway contractors in {locationContent.fullLocation}. 
          Our network includes only licensed professionals who understand local conditions, building codes, 
          and have great track records.
        </p>
      </div>
    </div>
  );
};

export default LocationHeader;
