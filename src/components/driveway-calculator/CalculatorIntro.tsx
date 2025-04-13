
import React from 'react';

interface CalculatorIntroProps {
  stateName: string;
}

const CalculatorIntro: React.FC<CalculatorIntroProps> = ({ stateName }) => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-2 text-center md:text-left">
        Estimate Your Driveway Cost in {stateName} Before You Talk to Anyone
      </h3>
      <p className="text-gray-700 text-sm mb-6 text-center md:text-left">
        Get local 2025 pricing based on your driveway size and finish. No signup needed.
      </p>
    </>
  );
};

export default CalculatorIntro;
