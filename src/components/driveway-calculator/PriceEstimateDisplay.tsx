
import React from 'react';
import { Button } from '@/components/ui/button';

interface PriceEstimateDisplayProps {
  price?: { pricePerSqft: string; avgSize: string; totalRange: string } | null;
  area: number;
  stateName: string;
  estimateDisclaimer?: string;
  onGetQuotes: (e: React.MouseEvent) => void;
}

export default function PriceEstimateDisplay({
  price,
  area,
  stateName,
  estimateDisclaimer,
  onGetQuotes
}: PriceEstimateDisplayProps) {
  // If we don't have pricing data or area is invalid
  if (!price || area <= 0) {
    return (
      <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
        <h3 className="text-lg font-medium text-gray-800">
          {area <= 0
            ? "Please enter valid dimensions to get an estimate"
            : "We're still gathering pricing data for this selection. Please continue and we'll guide you."}
        </h3>
        <Button className="mt-4" onClick={onGetQuotes}>Get Free Quotes</Button>
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-100">
      <h3 className="text-xl font-bold text-center">Your {stateName} Driveway Estimate</h3>
      
      <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Price per Sqft:</strong> {price.pricePerSqft}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Typical Job Size:</strong> {price.avgSize} sqft
        </p>
        <p className="text-sm text-gray-700 font-medium">
          <strong>Estimated Total Range:</strong> {price.totalRange}
        </p>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        <p>Driveway size: {area} sqft</p>
        {estimateDisclaimer && <p className="mt-1">{estimateDisclaimer}</p>}
      </div>
      
      <div className="mt-6 text-center">
        <Button size="lg" onClick={onGetQuotes}>Get Free Quotes</Button>
      </div>
    </div>
  );
}
