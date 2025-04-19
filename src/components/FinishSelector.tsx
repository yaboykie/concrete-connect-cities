
import React from 'react';
import { finishOptions, FinishOption } from '@/config/finishTypes';

interface FinishSelectorProps {
  selectedFinishId: string;
  onFinishChange: (id: string) => void;
  onInteraction?: () => void;
}

export default function FinishSelector({ 
  selectedFinishId, 
  onFinishChange, 
  onInteraction 
}: FinishSelectorProps) {
  
  const handleFinishChange = (id: string) => {
    onFinishChange(id);
    if (onInteraction) {
      onInteraction();
    }
  };
  
  return (
    <div className="my-6">
      <label className="text-sm font-medium block mb-2">Concrete Finish:</label>
      <div className="grid grid-cols-2 gap-3">
        {finishOptions.map((option: FinishOption) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                selectedFinishId === option.id 
                  ? 'bg-brand-blue/10 border-brand-blue shadow-sm' 
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => handleFinishChange(option.id)}
            >
              <div className="flex flex-col items-center text-center">
                <Icon className={`h-8 w-8 mb-2 ${selectedFinishId === option.id ? 'text-brand-blue' : 'text-gray-500'}`} />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{option.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

