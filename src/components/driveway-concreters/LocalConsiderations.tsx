
import React from 'react';

export interface LocalConsiderationsProps {
  locationContent: {
    fullLocation: string;
    weatherConsiderations: string;
  };
}

const LocalConsiderations: React.FC<LocalConsiderationsProps> = ({ locationContent }) => {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Local Driveway Concrete Considerations in {locationContent.fullLocation}
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-lg leading-relaxed">
            {locationContent.weatherConsiderations}
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Local Climate Expertise</h3>
              <p>Our contractors understand how {locationContent.fullLocation}'s specific weather patterns affect concrete curing and durability.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Soil Conditions</h3>
              <p>We consider local soil composition and drainage patterns to ensure your driveway has a stable, long-lasting foundation.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Local Building Codes</h3>
              <p>Our network of pros stays up-to-date with {locationContent.fullLocation} building requirements and permitting processes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalConsiderations;
