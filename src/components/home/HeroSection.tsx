
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  scrollToCalculator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToCalculator }) => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          See What It Should Actually Cost to Concrete Your Driveway — Before You Get a Single Quote
        </h1>

        <p className="mt-3 text-base text-gray-700">
          We'll show you real pricing based on your home's location and the type of concrete you're after — no chasing tradies, no inflated bids, just clear info for homeowners.
        </p>

        <p className="mt-2 text-sm text-gray-600 italic">
          Know what concrete should cost before speaking to a tradie — so you're in control, not guessing, when the real quotes come in.
        </p>

        <Button 
          onClick={scrollToCalculator}
          className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Start My Estimate <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
