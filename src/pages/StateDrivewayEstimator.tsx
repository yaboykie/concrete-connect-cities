
import React from 'react';
import { useParams } from 'react-router-dom';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';
import SEO from '@/components/SEO';

export default function StateDrivewayEstimator() {
  const { state } = useParams<{ state: string }>();
  const stateDisplayName = state ? state.charAt(0).toUpperCase() + state.slice(1) : '';
  
  return (
    <>
      <SEO
        title={`${stateDisplayName} Concrete Driveway Cost Estimator (2025 Prices)`}
        description={`Calculate how much a concrete driveway costs in ${stateDisplayName} with our free estimator tool. Updated 2025 pricing from local contractors.`}
      />
      <main className="container mx-auto px-4 py-8">
        <StateDrivewayCalculator />
        
        <div className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">About {stateDisplayName} Concrete Driveway Costs</h2>
          <p className="mb-4">
            Concrete driveway prices in {stateDisplayName} can vary based on several factors including the finish type, 
            size, preparation work required, and accessibility of your property.
          </p>
          <p className="mb-4">
            Our calculator provides a ballpark estimate based on average {stateDisplayName} prices from local concrete contractors.
            For an exact quote, we recommend getting in touch with several local professionals.
          </p>
        </div>
        
        <div id="quote-form" className="max-w-2xl mx-auto mt-16 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Get Free Quotes from {stateDisplayName} Concrete Contractors</h2>
          {/* Here you would add your actual quote form component */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-center text-gray-600 mb-4">
              Fill out the form below to receive free, no-obligation quotes from top-rated concrete contractors in your area.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
