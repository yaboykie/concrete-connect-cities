
import React from 'react';
import { LocationContentType } from './types';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import LocationHero from './LocationHero';
import LocalConsiderations from './LocalConsiderations';
import ConcreterDifference from './ConcreterDifference';
import FinalCTA from './FinalCTA';
import GoogleMap from './GoogleMap';

interface LocationDetailsProps {
  locationContent: LocationContentType;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationContent }) => {
  // Extract city and state from full location
  const [city, state] = locationContent.fullLocation.split(', ');
  
  return (
    <main className="flex-grow">
      <LocationHero locationContent={locationContent} />
      
      <LocalConsiderations 
        weatherConsiderations={locationContent.weatherConsiderations} 
        fullLocation={locationContent.fullLocation} 
      />
      
      {/* Google Map Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Concrete Driveway Services in {locationContent.fullLocation}</h2>
            <p className="text-lg mb-8">
              Our network of experienced driveway concreters covers all areas of {locationContent.fullLocation} and surrounding suburbs. 
              Contact us today to get connected with the best local concrete professionals for your driveway project.
            </p>
            <GoogleMap 
              latitude={locationContent.latitude} 
              longitude={locationContent.longitude}
              city={city}
              state={state}
            />
            <div className="mt-6 text-gray-600 text-sm">
              <p>Serving all areas of {locationContent.fullLocation} including surrounding suburbs and neighborhoods.</p>
            </div>
          </div>
        </div>
      </section>
      
      <ConcreterDifference />
      
      <section className="section bg-white">
        <ServiceListing 
          title={`Driveway Concreters Services in ${locationContent.fullLocation}`} 
          subtitle="Our network of concrete professionals offers comprehensive driveway solutions for your property"
          services={locationContent.services} 
        />
      </section>
      
      <TestimonialSection testimonials={locationContent.testimonials} />
      
      <section className="section bg-white">
        <FaqSection 
          title={`Common Questions About Concrete Driveways in ${locationContent.fullLocation}`}
          faqs={locationContent.faqs} 
        />
      </section>
      
      <FinalCTA fullLocation={locationContent.fullLocation} />
    </main>
  );
};

export default LocationDetails;
