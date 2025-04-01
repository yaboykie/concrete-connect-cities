
import React from 'react';
import { LocationContentType } from './types';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import LocationHeader from './LocationHeader';
import ProcessTimeline from './ProcessTimeline';
import LocationDescription from './LocationDescription';
import SecondaryCtaSection from './SecondaryCtaSection';
import LocationMapEmbed from './LocationMapEmbed';
import LocationTestimonials from './LocationTestimonials';
import FinalCta from './FinalCta';
import MobileCta from './MobileCta';

interface LocationDetailsProps {
  locationContent: LocationContentType;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationContent }) => {
  const [city, state] = locationContent.fullLocation.split(', ');
  
  return (
    <main className="flex-grow">
      {/* Header Section with Title and Introduction */}
      <LocationHeader 
        locationContent={locationContent} 
        city={city} 
        state={state} 
      />
      
      {/* Process Timeline */}
      <ProcessTimeline city={city} />
      
      {/* Main Content Section */}
      <LocationDescription 
        locationContent={locationContent} 
        city={city} 
        state={state} 
      />
      
      {/* Services Section */}
      <section className="section bg-white py-12">
        <ServiceListing 
          title={`Our Concrete Driveway Services in ${locationContent.fullLocation}`} 
          subtitle="We offer comprehensive concrete solutions tailored to your needs"
          services={locationContent.services} 
        />
      </section>
      
      {/* Testimonials Section */}
      <LocationTestimonials 
        testimonials={locationContent.testimonials} 
        city={city} 
      />
      
      {/* FAQ Section */}
      <section className="section bg-white py-12">
        <FaqSection 
          title={`Common Questions About Concrete Driveways in ${locationContent.fullLocation}`}
          faqs={locationContent.faqs} 
        />
      </section>
      
      {/* Secondary CTA Section */}
      <SecondaryCtaSection city={city} fullLocation={locationContent.fullLocation} />
      
      {/* Map Section */}
      <LocationMapEmbed 
        locationContent={locationContent} 
        city={city} 
        state={state} 
      />
      
      {/* Final CTA */}
      <FinalCta city={city} />
      
      {/* Sticky CTA Button for Mobile */}
      <MobileCta />
    </main>
  );
};

export default LocationDetails;
