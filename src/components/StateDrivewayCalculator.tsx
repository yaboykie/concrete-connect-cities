
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDrivewayCalculator, presets } from './driveway-calculator/useDrivewayCalculator';
import FinishSelector from '@/components/FinishSelector';
import SizePresetSelector from './driveway-calculator/SizePresetSelector';
import CustomSizeInputs from './driveway-calculator/CustomSizeInputs';
import PriceEstimateDisplay from './driveway-calculator/PriceEstimateDisplay';
import CalculatorIntro from './driveway-calculator/CalculatorIntro';

interface StateDrivewayCalculatorProps {
  afterContent?: React.ReactNode;
  estimateDisclaimer?: string;
  tooltipDescriptions?: Record<string, string>;
  onInteraction?: () => void;
  stateName?: string;
}

export default function StateDrivewayCalculator({
  afterContent,
  estimateDisclaimer,
  tooltipDescriptions,
  onInteraction,
  stateName: propStateName
}: StateDrivewayCalculatorProps) {
  const params = useParams<{ state: string }>();
  const stateFromParam = params.state;
  
  // Use stateName prop if provided, otherwise use from URL params, fallback to "California"
  const stateToUse = propStateName || stateFromParam || "California";
  
  console.log("Using state for calculator:", stateToUse);
  
  const {
    finishId,
    sizePreset,
    custom,
    isCustom,
    width,
    length,
    area,
    price,
    isLoading,
    error,
    handleSizeChange,
    handleFinishChange,
    handleCustomSizeChange,
    handleScrollToQuoteForm
  } = useDrivewayCalculator(stateToUse, onInteraction);

  const stateDisplayName = stateToUse ? stateToUse.charAt(0).toUpperCase() + stateToUse.slice(1) : '';

  console.log("Current price data:", price);
  console.log("Current area:", area);

  return (
    <div className="calculator bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <CalculatorIntro stateName={stateDisplayName} />
      
      <SizePresetSelector 
        presets={presets} 
        selectedPreset={sizePreset} 
        onPresetChange={handleSizeChange} 
      />

      {isCustom && (
        <CustomSizeInputs 
          width={custom.width} 
          length={custom.length}
          onChange={handleCustomSizeChange}
        />
      )}

      <FinishSelector 
        selectedFinishId={finishId}
        onFinishChange={handleFinishChange}
        onInteraction={onInteraction}
      />

      {isLoading ? (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
          <p className="text-sm text-gray-700 text-center">
            Loading pricing data...
          </p>
        </div>
      ) : error ? (
        <div className="mt-6 p-4 bg-red-50 rounded-md border border-red-200 mb-4">
          <p className="text-sm text-red-700 text-center">
            {error}
          </p>
        </div>
      ) : (
        <PriceEstimateDisplay 
          price={price}
          area={area}
          stateName={stateDisplayName}
          estimateDisclaimer={estimateDisclaimer}
          onGetQuotes={handleScrollToQuoteForm}
        />
      )}

      {afterContent && (
        <div className="mt-6">
          {afterContent}
        </div>
      )}
    </div>
  );
};
