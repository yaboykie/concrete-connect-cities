
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getFinishPricingByState } from '@/lib/api/getFinishPricing';
import FinishSelector from '@/components/FinishSelector';

const presets = {
  Small: { width: 10, length: 18, description: '1 car: 10×18 ft' },
  Medium: { width: 16, length: 20, description: '2 cars: 16×20 ft' },
  Large: { width: 20, length: 30, description: '3+ cars: 20×30 ft' }
};

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
  const [pricing, setPricing] = useState<Record<string, { min: number; max: number }>>({});
  const [finishId, setFinishId] = useState('plain');
  const [sizePreset, setSizePreset] = useState('Medium');
  const [custom, setCustom] = useState({ width: 0, length: 0 });

  const isCustom = sizePreset === 'Custom';
  const width = isCustom ? parseFloat(custom.width.toString() || '0') : presets[sizePreset as keyof typeof presets].width;
  const length = isCustom ? parseFloat(custom.length.toString() || '0') : presets[sizePreset as keyof typeof presets].length;
  const area = width * length;

  useEffect(() => {
    if (!state) return;
    const fetch = async () => {
      const formattedState = state.charAt(0).toUpperCase() + state.slice(1);
      const data = await getFinishPricingByState(formattedState);
      const prices: Record<string, { min: number; max: number }> = {};
      data.forEach((item: any) => {
        prices[item.finish] = {
          min: item.min_rate,
          max: item.max_rate
        };
      });
      setPricing(prices);
    };
    fetch();
  }, [state]);

  const finishMap: Record<string, string> = {
    plain: 'Plain Grey',
    exposed: 'Exposed Aggregate',
    stamped: 'Stamped Concrete',
    coloured: 'Coloured Concrete',
    pebble: 'Pebble Finish',
    brushed: 'Brushed Finish'
  };
  
  const handleInteraction = () => {
    if (onInteraction) {
      onInteraction();
    }
  };
  
  const handleSizeChange = (preset: string) => {
    setSizePreset(preset);
    handleInteraction();
  };
  
  const handleFinishChange = (id: string) => {
    setFinishId(id);
    handleInteraction();
  };
  
  const handleCustomSizeChange = (dimension: 'width' | 'length', value: number) => {
    setCustom(prev => ({ ...prev, [dimension]: value }));
    handleInteraction();
  };
  
  const handleScrollToQuoteForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const quoteForm = document.querySelector('#quote-form');
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
    handleInteraction();
  };

  const finishLabel = finishMap[finishId];
  const price = pricing[finishLabel];
  const minCost = price ? (area * price.min).toFixed(0) : '';
  const maxCost = price ? (area * price.max).toFixed(0) : '';

  const stateDisplayName = state ? state.charAt(0).toUpperCase() + state.slice(1) : '';

  return (
    <div className="calculator bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-center md:text-left">
        Estimate Your Driveway Cost in {stateDisplayName} Before You Talk to Anyone
      </h3>
      <p className="text-gray-700 text-sm mb-6 text-center md:text-left">
        Get local 2025 pricing based on your driveway size and finish. No signup needed.
      </p>
      
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {Object.entries(presets).map(([label, details]) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleSizeChange(label)}
                  variant={sizePreset === label ? "default" : "outline"}
                  className="w-full"
                >
                  {label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{details.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Button
            onClick={() => handleSizeChange('Custom')}
            variant={sizePreset === 'Custom' ? "default" : "outline"}
            className="w-full"
          >
            Custom
          </Button>
        </div>
      </TooltipProvider>

      {isCustom && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Width (ft):</label>
            <Input 
              type="number" 
              min="1"
              value={custom.width || ''}
              onChange={(e) => handleCustomSizeChange('width', parseInt(e.target.value) || 0)} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Length (ft):</label>
            <Input 
              type="number" 
              min="1"
              value={custom.length || ''}
              onChange={(e) => handleCustomSizeChange('length', parseInt(e.target.value) || 0)} 
            />
          </div>
        </div>
      )}

      <FinishSelector 
        selectedFinishId={finishId}
        onFinishChange={handleFinishChange}
        onInteraction={handleInteraction}
      />

      {price && area > 0 && (
        <Card className="mt-6 bg-brand-yellow/20 border border-brand-yellow mb-4">
          <CardContent className="pt-6">
            <p className="mb-2">📐 <strong>Estimated Area:</strong> {area} sq ft</p>
            <p className="mb-2 text-lg font-bold">💲 <strong>Estimated Price Range:</strong> ${minCost} – ${maxCost}</p>
            <p className="text-sm text-gray-600">📍 Based on average {stateDisplayName} prices (updated 2025).</p>
            <p className="text-sm text-gray-600 mt-1">
              💬 Final pricing depends on site conditions like concrete depth, access, and prep work. This is a ballpark estimate.
            </p>
            <p className="text-sm text-gray-500 italic mt-2">
              "According to Forbes, upgrading your driveway can instantly improve how your home looks from the street — and may even increase its resale value."
            </p>
            {estimateDisclaimer && (
              <p className="text-sm text-gray-600 mt-2">{estimateDisclaimer}</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="mt-4">
        <a 
          href="#quote-form" 
          onClick={handleScrollToQuoteForm}
          className="cta-button block w-full text-center text-lg py-4 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-all"
        >
          👍 Estimate Look Good? Get 2–3 Free Quotes Now
        </a>
        <p className="text-center text-sm mt-3 text-gray-700">
          These top-rated concreters are ready to go — most have slots available this month and are taking new projects now.
        </p>
      </div>

      {afterContent && (
        <div className="mt-6">
          {afterContent}
        </div>
      )}
    </div>
  );
}
