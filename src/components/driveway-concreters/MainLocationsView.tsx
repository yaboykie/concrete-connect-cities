
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationsList from '@/components/driveway-concreters/LocationsList';
import SEOHead from '@/components/driveway-concreters/SEOHead';

const MainLocationsView = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <SEOHead 
          title="Get Matched with Top Concrete Driveway Professionals" 
          description="Get instant quotes for your concrete driveway. Local concreters ready to provide free quotes in under 10 seconds with typical response times of 1-2 business hours."
          schemaData={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Concreter Quotes",
            "description": "Find affordable driveway concreters across the USA"
          }}
        />
        <Header />
        <LocationsList />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default MainLocationsView;
