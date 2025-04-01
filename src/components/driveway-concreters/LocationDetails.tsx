
import React from 'react';
import { LocationContentType } from './types';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import GoogleMap from './GoogleMap';
import QuoteForm from '@/components/QuoteForm';
import LocationHero from './LocationHero';
import LocalConsiderations from './LocalConsiderations';
import ConcreterDifference from './ConcreterDifference';
import FinalCTA from './FinalCTA';

interface LocationDetailsProps {
  locationContent: LocationContentType;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationContent }) => {
  // Extract city and state from full location
  const [city, state] = locationContent.fullLocation.split(', ');
  
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <LocationHero locationContent={locationContent} />
      
      {/* Quote Form Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Get Free Driveway Quotes in {locationContent.fullLocation}
          </h2>
          
          <div className="max-w-xl mx-auto">
            <QuoteForm location={locationContent.fullLocation} service="concrete-driveways" />
          </div>
        </div>
      </section>
      
      {/* Local Considerations */}
      <LocalConsiderations locationContent={locationContent} />
      
      {/* Services Section */}
      <section className="section bg-white">
        <ServiceListing 
          title={`Our Concrete Driveway Services in ${locationContent.fullLocation}`} 
          subtitle="We offer comprehensive concrete solutions tailored to your needs"
          services={locationContent.services} 
        />
      </section>
      
      {/* Our Difference */}
      <ConcreterDifference />
      
      {/* Testimonials Section */}
      <TestimonialSection testimonials={locationContent.testimonials} />
      
      {/* FAQ Section */}
      <section className="section bg-white">
        <FaqSection 
          title={`Common Questions About Concrete Driveways in ${locationContent.fullLocation}`}
          faqs={locationContent.faqs} 
        />
      </section>
      
      {/* Map Section - Moved to bottom as requested */}
      <section className="section bg-gray-50">
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
      
      {/* Final CTA */}
      <FinalCTA locationContent={locationContent} />
    </main>
  );
};

export default LocationDetails;
