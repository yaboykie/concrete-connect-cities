
import React from 'react';
import { LocationContentType } from './types';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import HeroSection from './HeroSection';
import ProcessTimeline from './ProcessTimeline';
import MainContentSection from './MainContentSection';
import SecondaryCtaSection from './SecondaryCtaSection';
import MapSection from './MapSection';
import FinalCta from './FinalCta';
import MobileCta from './MobileCta';

interface LocationDetailsProps {
  locationContent: LocationContentType;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationContent }) => {
  const [city, state] = locationContent.fullLocation.split(', ');
  
  const stateCode = state.length === 2 ? state.toLowerCase() : state.substring(0, 2).toLowerCase();
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <main className="flex-grow">
      {/* Hero Section with Form */}
      <HeroSection 
        locationContent={locationContent} 
        stateCode={stateCode} 
        citySlug={citySlug} 
      />
      
      {/* Process Timeline */}
      <ProcessTimeline city={city} />
      
      {/* Main SEO Content Section */}
      <MainContentSection locationContent={locationContent} city={city} />
      
      {/* Services Section */}
      <section className="section bg-white py-12">
        <ServiceListing 
          title={`Our Concrete Driveway Services in ${locationContent.fullLocation}`} 
          subtitle="We offer comprehensive concrete solutions tailored to your needs"
          services={locationContent.services} 
        />
      </section>
      
      {/* Testimonials Section */}
      <TestimonialSection testimonials={locationContent.testimonials} />
      
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
      <MapSection locationContent={locationContent} city={city} state={state} />
      
      {/* Final CTA */}
      <FinalCta city={city} />
      
      {/* Sticky CTA Button for Mobile */}
      <MobileCta />
    </main>
  );
};

export default LocationDetails;
