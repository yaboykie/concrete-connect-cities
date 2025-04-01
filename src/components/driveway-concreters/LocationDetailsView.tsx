
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
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
  const canonicalUrl = `https://concreterquotes.com/driveway-concreters/locations/${state}/${city}`;
  
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <SEOHead 
          title={`Get 3 Free Quotes From Top ${city} Driveway Concreters`}
          description={`Get instant quotes for your concrete driveway in ${city}, ${state}. Local concreters ready to provide free quotes in under 10 seconds with typical response times of 1-2 business hours.`}
          schemaData={locationContent?.schemaData}
          canonicalUrl={canonicalUrl}
        />
        <Header />
        <LocationDetails locationContent={locationContent} />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default LocationDetailsView;
