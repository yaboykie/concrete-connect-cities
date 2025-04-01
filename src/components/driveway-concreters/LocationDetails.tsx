
import React from 'react';
import { LocationContentType } from './types';
import FaqSection from '@/components/FaqSection';
import ServiceListing from '@/components/ServiceListing';
import TestimonialSection from '@/components/TestimonialSection';
import GoogleMap from './GoogleMap';
import QuoteForm from '@/components/QuoteForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { CheckIcon } from 'lucide-react';

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
                    A beautifully designed concrete driveway doesn't just add curb appeal—it makes a bold statement about how well your home is cared for.
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
      
      {/* Process Timeline */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            How It Works - Get Your Driveway Quote in 4 Simple Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Timeline connector line (visible on desktop only) */}
            <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-blue-200 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl">1</div>
              <h3 className="text-lg font-bold mb-2">Submit Request</h3>
              <p className="text-gray-600">Fill out our quick form with your project details in just 10 seconds</p>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl">2</div>
              <h3 className="text-lg font-bold mb-2">Get Matched</h3>
              <p className="text-gray-600">We instantly connect you with top-rated concreters in {city}</p>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl">3</div>
              <h3 className="text-lg font-bold mb-2">Receive Quotes</h3>
              <p className="text-gray-600">Get personalized quotes from local pros within 1-2 business hours</p>
            </div>
            
            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl">4</div>
              <h3 className="text-lg font-bold mb-2">Choose Your Pro</h3>
              <p className="text-gray-600">Compare quotes and select the best contractor for your project</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a href="#quote-form" className="cta-button inline-block">
              Get Started Now - Free Quotes
            </a>
          </div>
        </div>
      </section>
      
      {/* Main SEO Content Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Homeowners in {city} are Choosing Concrete Driveways
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                Homeowners in {locationContent.fullLocation} are increasingly investing in concrete driveways due to the unpredictable New England weather. Freezing temperatures, snow, and ice can cause wear on asphalt driveways, leading to cracks and deterioration. A concrete driveway offers more durability and resistance to extreme weather conditions. Plus, it adds curb appeal, which is important for {city}'s charming historic neighborhoods.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">The Cost-Effectiveness of Concrete Driveways</h3>
              <p>
                While a concrete driveway might have a higher initial cost compared to asphalt, it's far more cost-effective in the long run. Homeowners can save money on maintenance and repairs, especially in {city}'s climate, where asphalt requires more upkeep due to cracks caused by temperature shifts.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">How to Choose the Best Concrete Driveway Contractor in {city}</h3>
              <p>
                Selecting a reliable, experienced concrete contractor is essential for ensuring quality work. Look for professionals who are licensed, insured, and have good reviews from local customers. When you use our service, you get access to only the best, vetted professionals, so you can feel confident in your choice.
              </p>
              
              <p>
                {locationContent.serviceIntro}
              </p>
              <p>
                {locationContent.weatherConsiderations}
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <a href="#quote-form" className="cta-button inline-block">
                Get 3 Free Quotes from Local Concrete Pros
              </a>
            </div>
          </div>
        </div>
      </section>
      
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
      <section className="section bg-gray-50 py-12">
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
      <section className="section bg-white py-12" id="map-section">
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
