
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  scrollToCalculator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToCalculator }) => {
  return (
    <section className="bg-white py-16 px-4 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <ClipboardCheck className="h-12 w-12 text-brand-blue" />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-4 max-w-3xl mx-auto">
          Check Driveway Concrete Costs in Your Area — Instantly
        </h1>
        
        <p className="text-lg text-center text-gray-600 max-w-xl mx-auto mb-4">
          Use our free tool to see what other homeowners are paying — based on real jobs, finish type, and your location.
          No calls. No chasing tradies. Just clear cost info before you get quotes.
        </p>
        
        <p className="text-sm text-center text-gray-500 mb-6">
          Know what concrete should cost — before speaking to anyone.
        </p>
        
        <Button 
          onClick={scrollToCalculator}
          className="text-lg px-6 py-3 mx-auto block bg-brand-blue hover:bg-brand-blue/90 text-white"
        >
          Check My Driveway Cost <ArrowRight className="ml-2" />
        </Button>
        
        <p className="text-xs text-center text-gray-400 mt-2">
          Takes 30 seconds. No pressure.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
