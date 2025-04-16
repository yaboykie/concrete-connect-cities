
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SizePreset {
  width: number;
  length: number;
  description: string;
}

interface SizePresetSelectorProps {
  presets: Record<string, SizePreset>;
  selectedPreset: string;
  onPresetChange: (preset: string) => void;
}

const SizePresetSelector: React.FC<SizePresetSelectorProps> = ({
  presets,
  selectedPreset,
  onPresetChange
}) => {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {Object.entries(presets).map(([label, details]) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button
                onClick={() => onPresetChange(label)}
                variant={selectedPreset === label ? "default" : "outline"}
                className="w-full flex flex-col items-center"
              >
                <span className="font-semibold">{label}</span>
                <span className="text-xs text-gray-500 font-normal mt-1">
                  {details.description}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{details.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <Button
          onClick={() => onPresetChange('Custom')}
          variant={selectedPreset === 'Custom' ? "default" : "outline"}
          className="w-full"
        >
          Custom
        </Button>
      </div>
    </TooltipProvider>
  );
};

export default SizePresetSelector;
