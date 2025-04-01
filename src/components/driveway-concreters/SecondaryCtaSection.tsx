
import React from 'react';

interface SecondaryCtaSectionProps {
  city: string;
  fullLocation: string;
}

const SecondaryCtaSection: React.FC<SecondaryCtaSectionProps> = ({ city, fullLocation }) => {
  return (
    <section className="section bg-gray-50 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Ready to Transform Your Driveway?
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Get connected with the top concrete professionals in {fullLocation} today. 
          Our network of trusted contractors will provide you with competitive quotes for your project.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#quote-form" className="cta-button">
            Get Matched with Local Concrete Pros
          </a>
          <a href="#quote-form" className="bg-white text-brand-blue font-bold py-3 px-6 rounded-md shadow-lg border border-brand-blue hover:bg-gray-50 transition-all">
            Get 3 Free Quotes
          </a>
        </div>
      </div>
    </section>
  );
};

export default SecondaryCtaSection;
