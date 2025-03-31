
import React from 'react';
import { ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuoteForm from '@/components/QuoteForm';
import { LocationContentType } from './types';

interface LocationHeroProps {
  locationContent: LocationContentType;
}

const LocationHero: React.FC<LocationHeroProps> = ({ locationContent }) => {
  return (
    <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5">
            <div className="flex items-center text-brand-yellow mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{locationContent.fullLocation}</span>
            </div>
            <h1 className="text-white mb-6">{locationContent.title}</h1>
            <p className="text-lg text-gray-200 mb-8">{locationContent.serviceIntro}</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Free quotes from pre-screened local contractors</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Compare prices and services with no obligation</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Only work with licensed and insured professionals</span>
              </div>
            </div>
            <a href="#quote-form">
              <Button className="cta-button text-lg" size="lg">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
          
          <div className="lg:w-2/5" id="quote-form">
            <QuoteForm location={locationContent.fullLocation} service="driveway-concreters" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
