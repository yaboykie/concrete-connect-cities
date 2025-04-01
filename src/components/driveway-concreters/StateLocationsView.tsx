
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StateLocations from '@/components/driveway-concreters/StateLocations';
import SEOHead from '@/components/driveway-concreters/SEOHead';

interface StateLocationsViewProps {
  state: string;
}

const StateLocationsView: React.FC<StateLocationsViewProps> = ({ state }) => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <SEOHead 
          title={`Get 3 Free Quotes From Top ${state.toUpperCase()} Driveway Concreters`}
          description={`Get instant quotes for your concrete driveway in ${state.toUpperCase()}. Local concreters ready to provide free quotes in under 10 seconds with typical response times of 1-2 business hours.`}
          schemaData={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Concreter Quotes",
            "description": `Find affordable driveway concreters in ${state.toUpperCase()}`
          }}
        />
        <Header />
        <StateLocations state={state} />
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default StateLocationsView;
