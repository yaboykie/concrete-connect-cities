
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatStateName } from '../driveway-concreters/utils/locationFormatter';

interface StateSelectorProps {
  selectedState: string;
  onChange: (state: string) => void;
}

// Available states with proper formatting
const availableStates = [
  { name: "Texas" },
  { name: "California" },
  { name: "Florida" },
  { name: "Arizona" },
  { name: "Washington" },
  { name: "Pennsylvania" },
  { name: "Ohio" },
  { name: "Illinois" },
  { name: "Georgia" },
  { name: "North Carolina" }
];

export default function StateSelector({ selectedState, onChange }: StateSelectorProps) {
  // Ensure state name is properly formatted
  const formattedSelectedState = formatStateName(selectedState);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Select State:</label>
      <Select
        value={formattedSelectedState}
        onValueChange={(value) => {
          console.log("State changed to:", value);
          onChange(value);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          {availableStates.map((state) => (
            <SelectItem key={state.name} value={state.name}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
