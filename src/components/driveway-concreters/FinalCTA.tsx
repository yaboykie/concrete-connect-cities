
import React from 'react';
import { ArrowRight, Clock, CheckCircle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  fullLocation: string;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ fullLocation }) => {
  // Extract just the city name if the location includes city and state
  const displayLocation = fullLocation.includes(',') 
    ? fullLocation.split(',')[0].trim() 
    : fullLocation;

  // Check if we're in NYC for specific messaging
  const isNYC = displayLocation.toLowerCase() === 'new york city';

  return (
    <section className="section bg-gradient-to-b from-brand-yellow to-brand-yellow/20 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          {isNYC ? "Transform Your NYC Driveway Without the Hassle" : `Ready for a Better Driveway in ${displayLocation}?`}
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
          {isNYC ? 
            "Our network of trusted NYC concrete pros can handle everything from permits to finishing touches, creating a durable driveway that stands up to NYC traffic and weather." :
            `Our network of trusted contractors in ${displayLocation} is ready to transform your home's first impression with a beautiful, durable concrete driveway.`
          }
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            <span className="text-gray-700">Free, no-obligation quotes</span>
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            <span className="text-gray-700">Licensed & insured contractors</span>
          </div>
          <div className="flex items-center justify-center">
            <Clock className="h-5 w-5 mr-2 text-brand-blue" />
            <span className="text-gray-700">24-hour response guaranteed</span>
          </div>
        </div>
        
        <div className="bg-white py-3 px-6 rounded-lg shadow inline-block mb-8">
          <div className="flex items-center justify-center">
            <Shield className="h-5 w-5 mr-2 text-brand-blue" />
            <span className="text-gray-700 font-medium">
              {isNYC ? "All contractors are fully licensed with NYC Department of Consumer Affairs" : "All contractors meet local licensing requirements"}
            </span>
          </div>
        </div>
        
        <Button className="cta-button text-lg font-bold bg-brand-blue hover:bg-brand-blue/90 shadow-lg hover:shadow-xl transition-all" size="lg">
          Get Your 3 Free Quotes Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-sm text-gray-800 mt-4 bg-white/70 inline-block px-4 py-2 rounded-full shadow-sm">
          🎯 We only match you with pros who are actually available in {displayLocation} with 24-hour response time
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
