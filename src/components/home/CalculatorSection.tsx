
import React from 'react';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';

interface CalculatorSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement>;
  onCalculate?: (data: { area: number; priceRange: string; stateName: string }) => void;
}

const CalculatorSection = ({ calculatorRef, onCalculate }: CalculatorSectionProps) => {
  const handleCalculatorData = (area: number, priceRange: string, stateName: string) => {
    if (onCalculate) {
      onCalculate({ area, priceRange, stateName });
    }
  };

  return (
    <section ref={calculatorRef} className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <StateDrivewayCalculator onCalculate={handleCalculatorData} />
      </div>
    </section>
  );
};

export default CalculatorSection;
