
import React from 'react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  scrollToCalculator: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ scrollToCalculator }) => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-black text-white p-6 rounded-xl text-center space-y-3">
          <h2 className="text-2xl font-bold">Ready to See What It'll Cost?</h2>
          <p className="text-sm text-gray-300">
            Start with your instant estimate. If it looks right, we'll connect you to the right concreters — no pressure.
          </p>
          <Button 
            onClick={scrollToCalculator}
            className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            Get My Local Estimate
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
