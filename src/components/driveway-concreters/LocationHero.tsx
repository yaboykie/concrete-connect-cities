
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
            <h1 className="text-white mb-4">
              Cracked Driveway? Patchy Asphalt? Let's Fix That. Fast.
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              Your driveway is the first impression your home makes. Our {locationContent.fullLocation} concreters turn eyesores into assets — with durable, affordable driveways built for local weather conditions.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Vetted & Licensed Pros — Ready to Start</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Transparent Quotes — No Guesswork</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Fast Turnaround — Some Jobs Start in 48 Hrs</span>
              </div>
            </div>
            <a href="#quote-form">
              <Button className="cta-button text-lg font-bold" size="lg">
                🎯 Get 3 Fast Quotes From Local Concreters
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
