
import React from 'react';
import { Button } from '@/components/ui/button';

interface PriceEstimateDisplayProps {
  price?: { pricePerSqft: string; avgSize: string; totalRange: string } | null;
  area: number;
  stateName: string;
  estimateDisclaimer?: string;
  onGetQuotes: (e: React.MouseEvent) => void;
  dataSource?: string;
}

export default function PriceEstimateDisplay({
  price,
  area,
  stateName,
  estimateDisclaimer,
  onGetQuotes,
  dataSource = 'specific'
}: PriceEstimateDisplayProps) {
  // If we don't have pricing data or area is invalid
  if (!price || area <= 0) {
    return (
      <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-100 text-center">
        <h3 className="text-lg font-medium text-gray-800">
          {area <= 0
            ? "Please enter valid dimensions to get an estimate"
            : `We're showing you our standard pricing guide. For exact quotes in ${stateName}, please continue below.`}
        </h3>
        <Button className="mt-4" onClick={onGetQuotes}>Get Free Quotes</Button>
      </div>
    );
  }

  // Calculate the estimated price range based on the actual area
  const calculatePriceRange = () => {
    // Extract numbers from the pricePerSqft string (e.g., "$5-7" -> [5, 7])
    const priceMatch = price.pricePerSqft.match(/\$(\d+)-(\d+)/);
    if (!priceMatch) return price.totalRange; // Fallback to the default range

    const minPrice = parseInt(priceMatch[1]);
    const maxPrice = parseInt(priceMatch[2]);
    
    // Calculate the price range based on the actual area
    const minTotal = minPrice * area;
    const maxTotal = maxPrice * area;
    
    return `$${minTotal.toLocaleString()}-${maxTotal.toLocaleString()}`;
  };

  // Get the calculated price range
  const calculatedPriceRange = calculatePriceRange();

  // Determine data source message
  const getDataSourceMessage = () => {
    switch(dataSource) {
      case 'specific':
        return null; // No message needed for database-specific data
      case 'state-default':
        return (
          <p className="mt-1 text-green-600">
            Using specific pricing data for {stateName}.
          </p>
        );
      case 'fallback':
      default:
        return (
          <p className="mt-1 text-amber-600">
            Note: Using estimated pricing for {stateName} based on regional averages.
            Request quotes below for exact pricing from local contractors.
          </p>
        );
    }
  };

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
        <p className="text-sm text-gray-700 mb-2">
          <strong>Typical Total Range:</strong> {price.totalRange}
        </p>
        <p className="text-sm font-medium text-gray-800">
          <strong>Your Estimated Cost:</strong> {calculatedPriceRange} ({area} sqft)
        </p>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        <p>Driveway size: {area} sqft</p>
        {estimateDisclaimer && <p className="mt-1">{estimateDisclaimer}</p>}
        {getDataSourceMessage()}
      </div>
      
      <div className="mt-6 text-center">
        <Button size="lg" onClick={onGetQuotes}>Get Free Quotes</Button>
      </div>
    </div>
  );
}
