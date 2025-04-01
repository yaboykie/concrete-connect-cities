
import React from 'react';
import QuoteForm from '@/components/QuoteForm';
import { useIsMobile } from '@/hooks/use-mobile';
import LocationBreadcrumb from './LocationBreadcrumb';
import { LocationContentType } from './types';

interface HeroSectionProps {
  locationContent: LocationContentType;
  stateCode: string;
  citySlug: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ locationContent, stateCode, citySlug }) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-8 md:py-12 bg-gray-50 border-b">
      <div className="container mx-auto px-4">
        <LocationBreadcrumb state={stateCode} city={citySlug} />
        
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
                  ⚒️ <span className="font-bold">Get Matched With Top Concrete Pros in {locationContent.fullLocation.split(',')[0]}</span>
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

                <p className="text-lg text-gray-700 font-medium">
                  🚀 <span className="font-bold">The Convenience of Our Service</span>
                </p>
                <p className="text-lg text-gray-700">
                  Forget about endless calls and days of waiting for quotes. In just 10 seconds, you can post your job, and the best local concrete professionals will offer bids for your project. Our service makes it simple, quick, and easy to get the right concrete company for you.
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
  );
};

export default HeroSection;
