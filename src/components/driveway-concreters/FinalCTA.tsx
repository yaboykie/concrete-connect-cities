
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  fullLocation: string;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ fullLocation }) => {
  return (
    <section className="section bg-brand-yellow/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Get Started with Your Concrete Driveway Project?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Take the first step toward your new affordable concrete driveway today. Our network of professional 
          contractors in {fullLocation} is ready to help with free, no-obligation quotes!
        </p>
        <Button className="cta-button text-lg" size="lg">
          Get Your Free Affordable Driveway Quote in {fullLocation}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
