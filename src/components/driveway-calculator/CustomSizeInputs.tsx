
import React from 'react';
import { Input } from '@/components/ui/input';

interface CustomSizeInputsProps {
  width: number;
  length: number;
  onChange: (dimension: 'width' | 'length', value: number) => void;
}

const CustomSizeInputs: React.FC<CustomSizeInputsProps> = ({ width, length, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Width (ft):</label>
        <Input 
          type="number" 
          min="1"
          value={width || ''}
          onChange={(e) => onChange('width', parseInt(e.target.value) || 0)} 
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Length (ft):</label>
        <Input 
          type="number" 
          min="1"
          value={length || ''}
          onChange={(e) => onChange('length', parseInt(e.target.value) || 0)} 
        />
      </div>
    </div>
  );
};

export default CustomSizeInputs;
