
import React from 'react';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  fullLocation: string;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ fullLocation }) => {
  // Extract just the city name if the location includes city and state
  const displayLocation = fullLocation.includes(',') 
    ? fullLocation.split(',')[0].trim() 
    : fullLocation;

  return (
    <section className="section bg-gradient-to-b from-brand-yellow/50 to-brand-yellow/10 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Stop Living With That Cracked, Faded Driveway
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto font-medium">
          Our network of trusted contractors in {displayLocation} is ready to transform 
          your home's first impression with a beautiful, durable concrete driveway.
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
            <span className="text-gray-700">Many jobs start within 2 weeks</span>
          </div>
        </div>
        
        <Button className="cta-button text-lg font-bold bg-brand-blue hover:bg-brand-blue/90 shadow-lg hover:shadow-xl transition-all" size="lg">
          Get 3 Free Quotes Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-sm text-gray-700 mt-4 bg-white/50 inline-block px-4 py-2 rounded-full shadow-sm">
          🎯 We only match you with pros who are actually available in {displayLocation} this week
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
