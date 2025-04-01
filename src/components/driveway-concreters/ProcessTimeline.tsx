
import React from 'react';

interface ProcessTimelineProps {
  city: string;
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ city }) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How It Works - Get Your Driveway Quote in 4 Simple Steps
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Timeline connector line (visible on desktop only) */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-blue-200 z-0"></div>
          
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl shadow-lg">1</div>
            <h3 className="text-lg font-bold mb-2">Submit Request</h3>
            <p className="text-gray-600">Fill out our quick form with your project details in just 10 seconds</p>
          </div>
          
          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl shadow-lg">2</div>
            <h3 className="text-lg font-bold mb-2">Get Matched</h3>
            <p className="text-gray-600">We instantly connect you with top-rated concreters in {city}</p>
          </div>
          
          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl shadow-lg">3</div>
            <h3 className="text-lg font-bold mb-2">Receive Quotes</h3>
            <p className="text-gray-600">Get personalized quotes from local pros within 1-2 business hours</p>
          </div>
          
          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center mb-4 font-bold text-xl shadow-lg">4</div>
            <h3 className="text-lg font-bold mb-2">Choose Your Pro</h3>
            <p className="text-gray-600">Compare quotes and select the best contractor for your project</p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <a href="#quote-form" className="cta-button inline-block">
            Get Started Now - Free Quotes
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
