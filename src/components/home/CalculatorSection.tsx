
import React, { useState, useEffect } from 'react';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';

interface CalculatorSectionProps {
  calculatorRef: React.RefObject<HTMLDivElement>;
  onCalculatorDataUpdate?: (data: { area: number; priceRange: string; stateName: string }) => void;
}

const CalculatorSection = ({ calculatorRef, onCalculatorDataUpdate }: CalculatorSectionProps) => {
  // Create state to track the calculator data
  const [calculatorData, setCalculatorData] = useState({
    area: 0,
    priceRange: 'Contact for quote',
    stateName: 'Texas'
  });

  // Custom handler for calculator interactions
  const handleCalculatorInteraction = (data: { area: number; priceRange: string; stateName: string }) => {
    setCalculatorData(data);
    if (onCalculatorDataUpdate) {
      onCalculatorDataUpdate(data);
    }
    console.log("Calculator data captured:", data);
  };

  return (
    <section className="bg-gray-50 py-12 px-4" ref={calculatorRef}>
      <div className="container mx-auto max-w-4xl">
        <StateDrivewayCalculator 
          onEstimateCalculated={handleCalculatorInteraction}
        />
      </div>
    </section>
  );
};

export default CalculatorSection;
