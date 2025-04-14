
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StateSelectorProps {
  selectedState: string;
  onChange: (state: string) => void;
}

const availableStates = [
  { code: "wa", name: "Washington" },
  { code: "pa", name: "Pennsylvania" },
  { code: "oh", name: "Ohio" },
  { code: "il", name: "Illinois" },
  { code: "ga", name: "Georgia" },
  { code: "nc", name: "North Carolina" },
  { code: "az", name: "Arizona" },
  { code: "ca", name: "California" },
  { code: "fl", name: "Florida" },
  { code: "tx", name: "Texas" }
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
            <SelectItem key={state.code} value={state.name}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
