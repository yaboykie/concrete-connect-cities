
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StateSelectorProps {
  selectedState: string;
  onChange: (state: string) => void;
}

// Updated with full state names only
const availableStates = [
  { name: "Washington" },
  { name: "Pennsylvania" },
  { name: "Ohio" },
  { name: "Illinois" },
  { name: "Georgia" },
  { name: "North Carolina" },
  { name: "Arizona" },
  { name: "California" },
  { name: "Florida" },
  { name: "Texas" }
];

export default function StateSelector({ selectedState, onChange }: StateSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Select State:</label>
      <Select
        value={selectedState}
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
