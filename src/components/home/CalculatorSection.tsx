
import React from 'react';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';

interface CalculatorSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement>;
}

const CalculatorSection: React.FC<CalculatorSectionProps> = ({ calculatorRef }) => {
  return (
    <section className="bg-gray-50 py-12 px-4" ref={calculatorRef}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2/3 width) - Calculator */}
          <div className="lg:col-span-2">
            <StateDrivewayCalculator 
              stateName="ca" 
              estimateDisclaimer="These estimates are based on real project data from our network of concrete contractors."
            />
          </div>
          
          {/* Right Column (1/3 width) - Trust Copy */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              How This Estimate Works
            </h2>
            <p className="text-sm text-gray-600">
              This estimate pulls real data from concreters in your state — including driveways, patios, shed slabs and more.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              It's not a quote — it's a price guide based on typical job size and finish quality. So when the quotes come in, you already know what's fair.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
