
import React from 'react';
import { LocationContentType } from './types';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import LocationHero from './LocationHero';
import LocalConsiderations from './LocalConsiderations';
import ConcreterDifference from './ConcreterDifference';
import FinalCTA from './FinalCTA';

interface LocationDetailsProps {
  locationContent: LocationContentType;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationContent }) => {
  return (
    <main className="flex-grow">
      <LocationHero locationContent={locationContent} />
      
      <LocalConsiderations 
        weatherConsiderations={locationContent.weatherConsiderations} 
        fullLocation={locationContent.fullLocation} 
      />
      
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
