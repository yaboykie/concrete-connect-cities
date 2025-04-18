
import React from 'react';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';
import { CheckCircle } from 'lucide-react';
import { Quote } from 'lucide-react';

interface CalculatorSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement>;
}

const CalculatorSection: React.FC<CalculatorSectionProps> = ({ calculatorRef }) => {
  return (
    <section className="bg-gray-50 py-8 px-4" ref={calculatorRef}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Value framing and trust building */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-2">
                Wondering What You Should Actually Pay for a Driveway?
              </h2>
              <p className="text-gray-700 mb-3 max-w-md">
                Use real project data from concreters in your area to estimate your driveway cost — based on your state, finish type, and job size.
              </p>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>Based on 2025 pricing in Texas</span>
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

            {/* Testimonial Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm max-w-sm">
              <div className="flex items-start gap-2">
                <Quote className="h-5 w-5 text-brand-blue flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-700 italic">
                    "I didn't know what was fair to pay for a driveway. This gave me a clear range and saved me time chasing quotes."
                  </p>
                  <p className="mt-2 text-right text-xs text-gray-500">
                    — Daniel R., Plano TX
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Why Smart Homeowners Are Upgrading Their Concrete Now — Not Later
              </h2>
              <ul className="space-y-2">
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
            <h3 className="text-lg font-semibold mb-3">
              🎯 Your Texas Driveway Estimate
            </h3>
            <StateDrivewayCalculator 
              stateName="tx"
              estimateDisclaimer="These estimates are based on real project data from our network of concrete contractors."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
