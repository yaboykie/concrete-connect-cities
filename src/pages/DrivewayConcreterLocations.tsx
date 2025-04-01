import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locationData } from '@/components/driveway-concreters/LocationData';
import { getLocationContent } from '@/components/driveway-concreters/LocationContent';
import LocationsList from '@/components/driveway-concreters/LocationsList';
import LocationDetails from '@/components/driveway-concreters/LocationDetails';
import SEOHead from '@/components/driveway-concreters/SEOHead';
import { LocationContentType } from '@/components/driveway-concreters/types';
import { Skeleton } from '@/components/ui/skeleton';
import StateLocations from '@/components/driveway-concreters/StateLocations';

const DrivewayConcreterLocations = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  const [locationContent, setLocationContent] = useState<LocationContentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // If we have both state and city parameters, fetch city-specific content
    if (state && city) {
      const fetchLocationContent = async () => {
        try {
          setIsLoading(true);
          const content = await getLocationContent(state, city);
          setLocationContent(content);
          setError(null);
        } catch (err) {
          console.error("Error fetching location content:", err);
          setError("Failed to load location data. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchLocationContent();
    } else {
      // If we only have a state parameter or no parameters, don't need to fetch city content
      setIsLoading(false);
    }
  }, [state, city]);
  
  // If no parameters, show the main locations list
  if (!state && !city) {
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
  }
  
  // If only state parameter is present, show cities in that state
  if (state && !city) {
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
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div>
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !locationContent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-8">{error || "Could not load location data."}</p>
          <p>Please try again later or contact support if the problem persists.</p>
        </main>
        <Footer />
      </div>
    );
  }
  
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

export default DrivewayConcreterLocations;
