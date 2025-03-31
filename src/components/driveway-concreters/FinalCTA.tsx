
import React from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section className="section bg-brand-yellow/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Transform Your Driveway?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Stop putting up with that cracked, faded driveway. Our network of trusted 
          contractors in {displayLocation} is ready to help with free, no-obligation quotes!
        </p>
        <Button className="cta-button text-lg font-bold" size="lg">
          Get 3 Free Quotes Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-sm text-gray-600 mt-4">
          🎯 We only show your job to pros who are actually available this week
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
