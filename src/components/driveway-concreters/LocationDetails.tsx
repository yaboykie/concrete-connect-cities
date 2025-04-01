
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
      <LocationHero 
        title={locationContent.title}
        subtitle={locationContent.serviceIntro}
        location={locationContent.fullLocation}
      />
      
      {/* Quote and Map Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Get Free Driveway Quotes in {locationContent.fullLocation}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Fill Out This Quick Form</h3>
              <QuoteForm location={locationContent.fullLocation} service="concrete-driveways" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">Our Service Area</h3>
              <GoogleMap 
                latitude={locationContent.latitude} 
                longitude={locationContent.longitude}
                googleMapEmbed={locationContent.googleMapEmbed}
                city={city}
                state={state}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Local Considerations */}
      <LocalConsiderations 
        title={`Local Driveway Concrete Considerations in ${locationContent.fullLocation}`}
        content={locationContent.weatherConsiderations}
      />
      
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
      
      {/* Final CTA */}
      <FinalCTA 
        title={`Ready to Start Your Concrete Driveway Project in ${locationContent.fullLocation}?`}
        subtitle="Get connected with top-rated local contractors today"
        location={locationContent.fullLocation}
      />
    </main>
  );
};

export default LocationDetails;
