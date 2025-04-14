
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StateSelectorProps {
  selectedState: string;
  onChange: (state: string) => void;
}

const availableStates = [
  { code: "wa", name: "Washington (WA)" },
  { code: "pa", name: "Pennsylvania (PA)" },
  { code: "oh", name: "Ohio (OH)" },
  { code: "il", name: "Illinois (IL)" },
  { code: "ga", name: "Georgia (GA)" },
  { code: "nc", name: "North Carolina (NC)" },
  { code: "az", name: "Arizona (AZ)" },
  { code: "ca", name: "California (CA)" },
  { code: "fl", name: "Florida (FL)" },
  { code: "tx", name: "Texas (TX)" }
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
            <SelectItem key={state.code} value={state.code}>
              {state.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
