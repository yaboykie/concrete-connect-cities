
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  scrollToCalculator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToCalculator }) => {
  return (
    <section className="bg-white py-12 px-4 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-2">
          <ClipboardCheck className="h-8 w-8 text-brand-blue" />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-2 max-w-3xl mx-auto">
          Check Driveway Concrete Costs in Your Area — Instantly
        </h1>
        
        <p className="text-lg text-center text-gray-600 max-w-xl mx-auto mb-3">
          Use our free tool to see what other homeowners are paying — based on real jobs, finish type, and your location.
          No calls. No chasing tradies. Just clear cost info before you get quotes.
        </p>
        
        <p className="text-sm text-center text-gray-500 mb-3">
          Know what concrete should cost — before speaking to anyone.
        </p>
        
        <Button 
          onClick={scrollToCalculator}
          className="text-lg px-6 py-2.5 mx-auto block bg-brand-blue hover:bg-brand-blue/90 text-white"
        >
          Check My Driveway Cost <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
        
        <p className="text-xs text-center text-gray-400 mt-2">
          Takes 30 seconds. No pressure.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
