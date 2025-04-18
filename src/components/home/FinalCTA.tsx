
import React from 'react';
import { Button } from '@/components/ui/button';
import { scrollToCalculator } from '@/utils/scroll';

const FinalCTA = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-black text-white p-6 rounded-xl text-center space-y-3">
          <h2 className="text-2xl font-bold">Curious What a Concrete Driveway Costs in Your Area?</h2>
          <p className="text-sm text-gray-300">
            Use our free tool to estimate your project cost — then get matched with trusted concreters near you (if you want to).
          </p>
          <Button 
            onClick={scrollToCalculator}
            className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            Check My Driveway Estimate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
