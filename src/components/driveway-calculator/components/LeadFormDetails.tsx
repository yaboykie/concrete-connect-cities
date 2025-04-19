
import React from 'react';

interface LeadFormDetailsProps {
  area: number;
  priceRange: string;
  stateName: string;
}

export const LeadFormDetails = ({ area, priceRange, stateName }: LeadFormDetailsProps) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <h3 className="font-medium mb-2">Your {stateName} Driveway Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Size:</p>
          <p className="font-semibold">{area} sq ft</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Estimate:</p>
          <p className="font-semibold text-green-700">{priceRange}</p>
        </div>
      </div>
    </div>
  );
};
