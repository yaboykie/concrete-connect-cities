
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FinalCTAProps {
  locationContent: {
    fullLocation: string;
  };
}

const FinalCTA: React.FC<FinalCTAProps> = ({ locationContent }) => {
  return (
    <section className="bg-gradient-to-r from-brand-navy to-blue-900 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Your Concrete Driveway Project in {locationContent.fullLocation}?
        </h2>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Get connected with top-rated local contractors today
        </p>
        <Button className="cta-button text-lg font-bold" size="lg">
          Get Your Free Quotes Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="mt-6 text-gray-300">
          No obligation quotes • Local professionals • Fast response times
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
