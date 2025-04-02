
import React from 'react';
import { LocationContentType } from './types';

interface FinalCtaProps {
  locationContent: LocationContentType;
}

const FinalCta: React.FC<FinalCtaProps> = ({ locationContent }) => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">
          Transform Your Property With a Professional Concrete Driveway
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          A quality concrete driveway doesn't just improve your home's appearance—it increases your property value 
          and provides decades of reliable service. Get connected with {locationContent.fullLocation}'s best concrete professionals today.
        </p>
        <a href="#quote-form" className="cta-button inline-block text-lg py-4 px-8">
          Get Matched with Local Concrete Pros
        </a>
      </div>
    </section>
  );
};

export default FinalCta;
