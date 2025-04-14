
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
      
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-600">Driveway Size:</p>
          <p className="font-medium">{area} sq.ft.</p>
        </div>
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-600">Cost Per Square Foot:</p>
          <p className="font-medium">{price.pricePerSqft}</p>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <span className="font-medium">Estimated Total:</span>
          <span className="text-xl font-bold text-blue-700">
            {price.totalRange}
          </span>
        </div>
        
        {price.avgSize && (
          <div className="mt-2 text-sm text-gray-600">
            <span>Average Size: {price.avgSize}</span>
          </div>
        )}
      </div>
      
      {estimateDisclaimer && (
        <p className="mt-3 text-xs text-gray-500 text-center">{estimateDisclaimer}</p>
      )}
      
      <div className="mt-6 text-center">
        <Button size="lg" onClick={onGetQuotes}>Get Free Quotes</Button>
      </div>
    </div>
  );
}
