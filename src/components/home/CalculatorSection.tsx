
import React, { useState } from 'react';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';
import { CheckCircle } from 'lucide-react';

interface CalculatorSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement>;
}

const CalculatorSection: React.FC<CalculatorSectionProps> = ({ calculatorRef }) => {
  const [selectedState, setSelectedState] = useState("tx");
  const stateDisplayName = "Texas"; // This should be dynamic based on selectedState in a real implementation
  
  return (
    <section className="bg-gray-50 py-12 px-4" ref={calculatorRef}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Value framing and trust building */}
          <div className="space-y-6 lg:order-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-2">
                Wondering What You Should Actually Pay for a Driveway?
              </h2>
              <p className="text-gray-700 mb-4 max-w-md">
                Use real project data from concreters in your area to estimate your driveway cost — based on your state, finish type, and job size.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>Based on 2025 pricing in {stateDisplayName}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>Not a quote — no calls, no spam</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>Takes less than 30 seconds</span>
                </li>
              </ul>
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
          <div className="lg:order-2">
            <h3 className="text-lg font-semibold mb-4">
              🎯 Your {stateDisplayName} Driveway Estimate
            </h3>
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
