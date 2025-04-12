
import React, { useEffect } from 'react';
import LocationDetails from '@/components/driveway-concreters/LocationDetails';
import SEOHead from '@/components/driveway-concreters/SEOHead';
import { LocationContentType } from '@/components/driveway-concreters/types';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';

interface LocationDetailsViewProps {
  locationContent: LocationContentType;
  state: string;
  city: string;
}

const LocationDetailsView: React.FC<LocationDetailsViewProps> = ({ 
  locationContent, 
  state, 
  city 
}) => {
  // Add enhanced logging on component mount
  useEffect(() => {
    console.log('LocationDetailsView mounted with props:', { 
      locationContent, 
      state, 
      city,
      hasContent: !!locationContent,
      contentKeys: locationContent ? Object.keys(locationContent) : []
    });
  }, [locationContent, state, city]);
  
  // Check if we have valid location content and log any issues
  if (!locationContent || Object.keys(locationContent).length === 0) {
    console.error('LocationDetailsView received empty or invalid locationContent');
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Location data unavailable</h2>
          <p className="mb-4">We're having trouble loading information for {city}, {state}.</p>
          <p>Please try again later or check a different location.</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <SEOHead locationContent={locationContent} state={state} city={city} />
      <LocationDetails locationContent={locationContent} />
      {/* Add location-specific calculator for improved user experience */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <StateDrivewayCalculator 
            afterContent={
              <p className="mt-4 text-center text-gray-600">
                This estimate is specific to {city}, {state} market conditions and typical local rates.
              </p>
            }
          />
        </div>
      </div>
    </>
  );
};

export default LocationDetailsView;
