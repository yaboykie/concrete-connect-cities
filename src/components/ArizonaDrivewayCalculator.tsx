import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const finishRates = {
  "Standard Concrete": { min: 5.5, max: 7.5 },
  "Aggregate": { min: 8, max: 10 },
  "Exposed Aggregate": { min: 10, max: 13 },
  "Decorative": { min: 11, max: 14 },
  "Stamped Concrete": { min: 12, max: 16 },
  "Colored Concrete": { min: 9, max: 12 }
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
}

export default function ArizonaDrivewayCalculator({
  afterContent,
  estimateDisclaimer,
  tooltipDescriptions
}: ArizonaDrivewayCalculatorProps) {
  const [sizePreset, setSizePreset] = useState('Medium');
  const [custom, setCustom] = useState({ width: 0, length: 0 });
  const [finish, setFinish] = useState('Standard Concrete');

  const isCustom = sizePreset === 'Custom';
  const width = isCustom ? parseFloat(custom.width.toString() || '0') : presets[sizePreset as keyof typeof presets].width;
  const length = isCustom ? parseFloat(custom.length.toString() || '0') : presets[sizePreset as keyof typeof presets].length;
  const area = width * length;

  const { min, max } = finishRates[finish as keyof typeof finishRates];
  const minCost = (area * min).toFixed(0);
  const maxCost = (area * max).toFixed(0);
  
  const handleScrollToQuoteForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const quoteForm = document.querySelector('#quote-form');
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="calculator bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Select Driveway Size:</h3>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {Object.entries(presets).map(([label, details]) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setSizePreset(label)}
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
            onClick={() => setSizePreset('Custom')}
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
              onChange={(e) => setCustom(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Length (ft):</label>
            <Input 
              type="number" 
              min="1"
              value={custom.length || ''}
              onChange={(e) => setCustom(prev => ({ ...prev, length: parseInt(e.target.value) || 0 }))} 
            />
          </div>
        </div>
      )}

      <div className="my-6">
        <label className="text-sm font-medium block mb-2">Concrete Finish:</label>
        <TooltipProvider>
          <Select value={finish} onValueChange={(value) => setFinish(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select finish" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(finishRates).map(f => (
                <Tooltip key={f}>
                  <TooltipTrigger asChild>
                    <SelectItem value={f}>{f}</SelectItem>
                  </TooltipTrigger>
                  {tooltipDescriptions && tooltipDescriptions[f] && (
                    <TooltipContent>
                      <p>{tooltipDescriptions[f]}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </SelectContent>
          </Select>
        </TooltipProvider>
      </div>

      {area > 0 && (
        <Card className="mt-6 bg-brand-yellow/20 border border-brand-yellow">
          <CardContent className="pt-6">
            <p className="mb-2">📐 <strong>Estimated Area:</strong> {area} sq ft</p>
            <p className="mb-2 text-lg font-bold">💲 <strong>Estimated Price Range:</strong> ${minCost} – ${maxCost}</p>
            <p className="text-sm text-gray-600">📍 Based on average Arizona prices (updated 2024).</p>
            {estimateDisclaimer && (
              <p className="text-sm text-gray-600 mt-2">{estimateDisclaimer}</p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <a 
          href="#quote-form" 
          onClick={handleScrollToQuoteForm}
          className="cta-button block w-full text-center text-lg py-4 rounded-md bg-brand-blue text-white font-medium hover:bg-blue-600 transition-all"
        >
          📍 Get My Free Quotes
        </a>
      </div>

      {afterContent && (
        <div className="mt-6">
          {afterContent}
        </div>
      )}
    </div>
  );
}
