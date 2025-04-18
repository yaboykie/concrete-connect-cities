
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LeadCaptureDialog from './LeadCaptureDialog';

interface PriceEstimateDisplayProps {
  price: { pricePerSqft: string; avgSize: string; totalRange: string; } | null;
  area: number;
  stateName?: string;
  estimateDisclaimer?: string;
  onGetQuotes?: (e: React.MouseEvent) => void;
  dataSource?: string;
}

export default function PriceEstimateDisplay({
  price,
  area,
  stateName = '',
  estimateDisclaimer,
  onGetQuotes,
  dataSource = 'specific'
}: PriceEstimateDisplayProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleGetQuotesClick = (e: React.MouseEvent) => {
    setDialogOpen(true);
    
    // Still call the passed onGetQuotes function if it exists
    if (onGetQuotes) {
      onGetQuotes(e);
    }
  };
  
  if (!price) {
    return <div>No pricing available</div>;
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
      <h3 className="text-lg font-semibold mb-3">Your {stateName} Driveway Estimate</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
        <div className="bg-white p-3 rounded border border-gray-100">
          <p className="text-sm text-gray-600">Square Footage:</p>
          <p className="text-2xl font-bold">{area} sq ft</p>
        </div>
        <div className="bg-white p-3 rounded border border-gray-100">
          <p className="text-sm text-gray-600">Price Range:</p>
          <p className="text-2xl font-bold">{price.totalRange}</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        <p>
          <strong>Average Price:</strong> {price.pricePerSqft} per square foot 
          {dataSource !== 'specific' && (
            <span className="ml-1 text-amber-600">
              (using general pricing - exact {stateName} data not available)
            </span>
          )}
        </p>
        {estimateDisclaimer && <p className="mt-1 text-xs">{estimateDisclaimer}</p>}
      </div>
      
      <div className="mt-4">
        <Button 
          onClick={handleGetQuotesClick}
          className="w-full mb-1"
        >
          See Which Local Pros Match This Estimate
        </Button>
        <p className="text-xs text-gray-500 text-center px-2 mt-2">
          We only show concreters rated 4.7★ or higher on Google.
        </p>
      </div>
      
      <LeadCaptureDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        area={area}
        priceRange={price.totalRange} 
        stateName={stateName}
        purpose="quotes"
      />
    </div>
  );
}

