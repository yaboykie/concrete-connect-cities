
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScatterChart, Grid3x3, Square, Palette, Grip, Waves } from 'lucide-react';

const finishRates = {
  "Exposed Aggregate": { min: 10, max: 13 },
  "Stamped Concrete": { min: 12, max: 16 },
  "Plain Grey": { min: 5.5, max: 7.5 },
  "Coloured Concrete": { min: 9, max: 12 },
  "Pebble Finish": { min: 8, max: 10 },
  "Brushed Finish": { min: 6, max: 8 }
};

const finishOptions = [
  { id: 'exposed', label: 'Exposed Aggregate', icon: ScatterChart },
  { id: 'stamped', label: 'Stamped Concrete', icon: Grid3x3 },
  { id: 'plain', label: 'Plain Grey', icon: Square },
  { id: 'coloured', label: 'Coloured Concrete', icon: Palette },
  { id: 'pebble', label: 'Pebble Finish', icon: Grip },
  { id: 'brushed', label: 'Brushed Finish', icon: Waves }
];

const finishIdToLabel: Record<string, string> = {
  'exposed': 'Exposed Aggregate',
  'stamped': 'Stamped Concrete',
  'plain': 'Plain Grey',
  'coloured': 'Coloured Concrete',
  'pebble': 'Pebble Finish',
  'brushed': 'Brushed Finish'
};

const presets = {
  Small: { width: 10, length: 18, description: "1 car: 10×18 ft" },
  Medium: { width: 16, length: 20, description: "2 cars: 16×20 ft" },
  Large: { width: 20, length: 30, description: "3+ cars: 20×30 ft" }
};

interface ArizonaDrivewayCalculatorProps {
  afterContent?: React.ReactNode;
  estimateDisclaimer?: string;
  tooltipDescriptions?: Record<string, string>;
  onInteraction?: () => void;
}

export default function ArizonaDrivewayCalculator({
  afterContent,
  estimateDisclaimer,
  tooltipDescriptions,
  onInteraction
}: ArizonaDrivewayCalculatorProps) {
  const [sizePreset, setSizePreset] = useState('Medium');
  const [custom, setCustom] = useState({ width: 0, length: 0 });
  const [finishId, setFinishId] = useState('plain');

  const isCustom = sizePreset === 'Custom';
  const width = isCustom ? parseFloat(custom.width.toString() || '0') : presets[sizePreset as keyof typeof presets].width;
  const length = isCustom ? parseFloat(custom.length.toString() || '0') : presets[sizePreset as keyof typeof presets].length;
  const area = width * length;

  const finishLabel = finishIdToLabel[finishId];
  const { min, max } = finishRates[finishLabel as keyof typeof finishRates];
  const minCost = (area * min).toFixed(0);
  const maxCost = (area * max).toFixed(0);
  
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

  return (
    <div className="calculator bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-2 text-center md:text-left">
        Estimate Your Driveway Cost in Arizona Before You Talk to Anyone
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

      <div className="my-6">
        <label className="text-sm font-medium block mb-2">Concrete Finish:</label>
        <div className="grid grid-cols-2 gap-3">
          {finishOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  finishId === option.id 
                    ? 'bg-brand-blue/10 border-brand-blue shadow-sm' 
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
                onClick={() => handleFinishChange(option.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className={`h-8 w-8 mb-2 ${finishId === option.id ? 'text-brand-blue' : 'text-gray-500'}`} />
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {area > 0 && (
        <Card className="mt-6 bg-brand-yellow/20 border border-brand-yellow mb-4">
          <CardContent className="pt-6">
            <p className="mb-2">📐 <strong>Estimated Area:</strong> {area} sq ft</p>
            <p className="mb-2 text-lg font-bold">💲 <strong>Estimated Price Range:</strong> ${minCost} – ${maxCost}</p>
            <p className="text-sm text-gray-600">📍 Based on average Arizona prices (updated 2025).</p>
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
