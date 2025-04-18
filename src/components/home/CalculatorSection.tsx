
import React, { useState } from 'react';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';
import { CheckCircle } from 'lucide-react';

interface CalculatorSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement>;
}

const CalculatorSection: React.FC<CalculatorSectionProps> = ({ calculatorRef }) => {
  const [selectedState, setSelectedState] = useState("ca");
  
  return (
    <section className="bg-gray-50 py-12 px-4" ref={calculatorRef}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            {/* How This Estimate Works */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                How This Estimate Works
              </h2>
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  This estimate pulls real data from concreters in your state — including driveways, patios, shed slabs and more.
                </p>
                <p>
                  It's not a quote — it's a price guide based on typical job size and finish quality. So when the quotes come in, you already know what's fair.
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Why Smart Homeowners Are Upgrading Their Concrete Now — Not Later
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>Cracked, uneven driveways are trip hazards and eyesores</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>Water pooling near your slab can cause long-term damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>New concrete adds visual appeal and long-term value</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>According to Forbes, a new driveway can increase your home's value by $5,000–$7,000</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Right Column - Calculator */}
          <div>
            <StateDrivewayCalculator 
              stateName={selectedState}
              estimateDisclaimer="These estimates are based on real project data from our network of concrete contractors."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
