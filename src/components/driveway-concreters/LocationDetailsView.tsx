
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationDetails from '@/components/driveway-concreters/LocationDetails';
import SEOHead from '@/components/driveway-concreters/SEOHead';
import { LocationContentType } from '@/components/driveway-concreters/types';

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
  // Add detailed console logging to debug the component rendering
  console.log('LocationDetailsView rendering with props:', { locationContent, state, city });
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead locationContent={locationContent} state={state} city={city} />
      <Header />
      <LocationDetails locationContent={locationContent} />
      <Footer />
    </div>
  );
};

export default LocationDetailsView;
