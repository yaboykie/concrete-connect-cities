
import React from 'react';
import { ArrowRight, Clock, CheckCircle, Shield, Star } from 'lucide-react';
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
    <section className="section bg-gradient-to-b from-brand-blue/90 to-brand-navy py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Get Your Free {displayLocation} Driveway Quotes Today
        </h2>
        <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto font-medium">
          Our network of vetted {displayLocation} concrete pros handle everything from permits to finishing touches, creating driveways that withstand local conditions and add value to your property.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-center text-brand-yellow mb-3">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold mb-2">24-Hour Response</h3>
            <p className="text-gray-100">Get quotes from available pros within 24 hours of your request</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-center text-brand-yellow mb-3">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold mb-2">Verified Professionals</h3>
            <p className="text-gray-100">
              All contractors meet strict licensing requirements and pass our verification process
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-center text-brand-yellow mb-3">
              <Star className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold mb-2">Quality Guaranteed</h3>
            <p className="text-gray-100">Our network includes only proven professionals with excellent reviews</p>
          </div>
        </div>
        
        <Button className="cta-button text-lg font-bold bg-brand-yellow hover:bg-brand-yellow/90 text-brand-navy shadow-lg hover:shadow-xl transition-all" size="lg">
          Get Your 3 Free Quotes Today
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-sm text-gray-100 mt-4 bg-white/10 backdrop-blur-sm inline-block px-6 py-3 rounded-full">
          Exclusively matching you with available professionals in {displayLocation} • Fast 24-hour response guaranteed
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
