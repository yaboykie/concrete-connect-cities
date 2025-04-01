
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
import { useIsMobile } from '@/hooks/use-mobile';

interface LocationDetailsProps {
  locationContent: LocationContentType;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ locationContent }) => {
  const [city, state] = locationContent.fullLocation.split(', ');
  const isMobile = useIsMobile();
  
  return (
    <main className="flex-grow">
      {/* Hero Section with Form */}
      <section className="py-8 md:py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Column: Headline and Content */}
            <div className="lg:w-1/2 space-y-5 md:space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Professional Concrete Driveway Services in {locationContent.fullLocation}
              </h1>
              
              <div className="text-lg text-gray-700">
                Matched instantly with trusted local pros.
                Most respond within 1–2 business hours — no spam, no pressure, just real quotes from vetted concreters.
              </div>
              
              {/* Key value propositions */}
              <div className="space-y-4">
                <div className="space-y-4">
                  <p className="text-lg text-gray-700 font-medium">
                    🏡 <span className="font-bold">Your Driveway, Your First Impression</span>
                  </p>
                  <p className="text-lg text-gray-700">
                    Make the best first impression with a beautiful concrete driveway that elevates your home's curb appeal and adds long-term value.
                  </p>
                  
                  <p className="text-lg text-gray-700 font-medium">
                    ⚒️ <span className="font-bold">Get Matched With Top Concrete Pros in {city}</span>
                  </p>
                  <p className="text-lg text-gray-700">
                    We instantly match you with vetted, local concreters who specialize in concrete driveways in {locationContent.fullLocation}.
                  </p>
                  
                  <p className="text-lg text-gray-700 font-medium">
                    ⏱️ <span className="font-bold">Instant Quotes. Real Professionals.</span>
                  </p>
                  <p className="text-lg text-gray-700">
                    Get your free, no-obligation quotes in under 10 seconds, with a typical response time of just 1-2 business hours.
                  </p>
                </div>
              </div>
              
              {/* Mobile form placement */}
              {isMobile && (
                <div className="mt-6">
                  <QuoteForm location={locationContent.fullLocation} service="concrete-driveways" />
                </div>
              )}
            </div>
            
            {/* Right Column: Quote Form (desktop only) */}
            {!isMobile && (
              <div className="lg:w-1/2 w-full">
                <QuoteForm location={locationContent.fullLocation} service="concrete-driveways" />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Local Considerations - Trimmed down */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              Professional Driveways in {locationContent.fullLocation}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                {locationContent.serviceIntro}
              </p>
              <p>
                {locationContent.weatherConsiderations}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="section bg-gray-50">
        <ServiceListing 
          title={`Our Concrete Driveway Services in ${locationContent.fullLocation}`} 
          subtitle="We offer comprehensive concrete solutions tailored to your needs"
          services={locationContent.services} 
        />
      </section>
      
      {/* Concreter Difference - Using a lighter background for readability */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Choose Professional Driveway Concreters in {city}?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Built to Last</h3>
                <p className="text-gray-700">
                  Professional concrete driveways can last 30+ years with minimal maintenance, outperforming asphalt 
                  and gravel alternatives by decades.
                </p>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">Design Flexibility</h3>
                <p className="text-gray-700">
                  From stamped patterns to decorative aggregates and color options, concrete offers unmatched 
                  design versatility for any home style.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a href="#quote-form" className="cta-button inline-block">
                Get Matched with Local Concrete Pros
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialSection testimonials={locationContent.testimonials} />
      
      {/* FAQ Section */}
      <section className="section bg-white">
        <FaqSection 
          title={`Common Questions About Concrete Driveways in ${locationContent.fullLocation}`}
          faqs={locationContent.faqs} 
        />
      </section>
      
      {/* Secondary CTA Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Transform Your Driveway?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Get connected with the top concrete professionals in {locationContent.fullLocation} today. 
            Our network of trusted contractors will provide you with competitive quotes for your project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#quote-form" className="cta-button">
              Get Matched with Local Concrete Pros
            </a>
            <a href="#quote-form" className="bg-white text-brand-blue font-bold py-3 px-6 rounded-md shadow-lg border border-brand-blue hover:bg-gray-50 transition-all">
              Get 3 Free Quotes
            </a>
          </div>
        </div>
      </section>
      
      {/* Map Section - At the bottom as requested */}
      <section className="section bg-white" id="map-section">
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
      
      {/* Final CTA with a lighter background for better readability */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-900">
            Transform Your Property With a Professional Concrete Driveway
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            A quality concrete driveway doesn't just improve your home's appearance—it increases your property value 
            and provides decades of reliable service. Get connected with {city}'s best concrete professionals today.
          </p>
          <a href="#quote-form" className="cta-button inline-block text-lg py-4 px-8">
            Get Matched with Local Concrete Pros
          </a>
        </div>
      </section>
      
      {/* Sticky CTA Button for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
          <a 
            href="#quote-form" 
            className="cta-button block w-full text-center text-lg py-4"
          >
            Get My Free Quotes
          </a>
        </div>
      )}
    </main>
  );
};

export default LocationDetails;
