import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDrivewayCalculator, presets } from './driveway-calculator/useDrivewayCalculator';
import FinishSelector from '@/components/FinishSelector';
import SizePresetSelector from './driveway-calculator/SizePresetSelector';
import CustomSizeInputs from './driveway-calculator/CustomSizeInputs';
import PriceEstimateDisplay from './driveway-calculator/PriceEstimateDisplay';
import CalculatorIntro from './driveway-calculator/CalculatorIntro';
import StateSelector from './driveway-calculator/StateSelector';
import { useToast } from '@/hooks/use-toast';

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
  
  const initialState = (propStateName || stateFromParam || "Texas").toLowerCase();
  const stateMap: Record<string, string> = {
    'tx': 'Texas',
    'ca': 'California',
    'fl': 'Florida',
    'az': 'Arizona',
    'wa': 'Washington',
    'pa': 'Pennsylvania',
    'oh': 'Ohio',
    'il': 'Illinois',
    'ga': 'Georgia',
    'nc': 'North Carolina'
  };
  
  const mappedInitialState = stateMap[initialState] || initialState;
  
  const { toast } = useToast();
  
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
    selectedState,
    dataSource,
    handleSizeChange,
    handleFinishChange,
    handleCustomSizeChange,
    handleScrollToQuoteForm,
    handleStateChange
  } = useDrivewayCalculator(mappedInitialState, onInteraction);

  useEffect(() => {
    if (selectedState) {
      toast({
        description: `Loading concrete prices for ${selectedState}...`,
        duration: 3000,
      });
    }
  }, [selectedState, toast]);

  const stateDisplayName = selectedState;

  console.log("Current price data:", price);
  console.log("Current area:", area);
  console.log("Selected state:", selectedState);
  console.log("Data source:", dataSource);

  return (
    <div className="calculator bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto">
      {isLoading ? (
        <div className="p-3 bg-gray-50 rounded-md border border-gray-200 mb-3">
          <p className="text-sm text-gray-700 text-center">
            Loading pricing data for {stateDisplayName}...
          </p>
        </div>
      ) : error ? (
        <div className="p-3 bg-amber-50 rounded-md border border-amber-200 mb-3">
          <p className="text-sm text-amber-700 text-center">
            {error} We're showing you our standard pricing guide instead.
          </p>
        </div>
      ) : price && (
        <PriceEstimateDisplay 
          price={price}
          area={area}
          stateName={stateDisplayName}
          estimateDisclaimer={estimateDisclaimer}
          onGetQuotes={handleScrollToQuoteForm}
          dataSource={dataSource}
        />
      )}
      
      <div className="space-y-3">
        <StateSelector 
          selectedState={selectedState}
          onChange={handleStateChange}
        />
        
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
      </div>

      {afterContent && (
        <div className="mt-4">
          {afterContent}
        </div>
      )}
    </div>
  );
};
