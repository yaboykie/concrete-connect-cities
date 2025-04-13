
import React from 'react';
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
}

export default function StateDrivewayCalculator({
  afterContent,
  estimateDisclaimer,
  tooltipDescriptions,
  onInteraction
}: StateDrivewayCalculatorProps) {
  const { state } = useParams<{ state: string }>();
  const {
    finishId,
    sizePreset,
    custom,
    isCustom,
    width,
    length,
    area,
    price,
    handleSizeChange,
    handleFinishChange,
    handleCustomSizeChange,
    handleScrollToQuoteForm
  } = useDrivewayCalculator(state, onInteraction);

  const stateDisplayName = state ? state.charAt(0).toUpperCase() + state.slice(1) : '';

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

      <PriceEstimateDisplay 
        price={price}
        area={area}
        stateName={stateDisplayName}
        estimateDisclaimer={estimateDisclaimer}
        onGetQuotes={handleScrollToQuoteForm}
      />

      {afterContent && (
        <div className="mt-6">
          {afterContent}
        </div>
      )}
    </div>
  );
}
