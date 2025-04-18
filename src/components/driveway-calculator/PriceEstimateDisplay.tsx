
import React from 'react';
import { Button } from '@/components/ui/button';
import LeadCaptureDialog from './LeadCaptureDialog';
import { cn } from "@/lib/utils";

interface PriceEstimateDisplayProps {
  price: { pricePerSqft: string; avgSize: string; totalRange: string; } | null;
  area: number;
  stateName?: string;
  estimateDisclaimer?: string;
  onGetQuotes?: (e: React.MouseEvent) => void;
  dataSource?: string;
  className?: string;
}

export default function PriceEstimateDisplay({
  price,
  area,
  stateName = '',
  estimateDisclaimer,
  onGetQuotes,
  dataSource = 'specific',
  className
}: PriceEstimateDisplayProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleGetQuotesClick = (e: React.MouseEvent) => {
    setDialogOpen(true);
    
    if (onGetQuotes) {
      onGetQuotes(e);
    }
  };
  
  if (!price) {
    return null;
  }

  return (
    <div className={cn(
      "mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 mb-4 animate-fade-in",
      className
    )}>
      <h3 className="text-lg font-semibold mb-1">
        🎯 Your {stateName} Driveway Estimate
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
        <div className="bg-white p-3 rounded border border-gray-100">
          <p className="text-sm text-gray-600">Square Footage:</p>
          <p className="text-2xl font-bold">{area} sq ft</p>
        </div>
        <div className="bg-white p-3 rounded border border-gray-100">
          <p className="text-sm text-gray-600">Price Range:</p>
          <p className="text-2xl font-bold text-green-700">{price.totalRange}</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        {estimateDisclaimer && <p className="mt-1 text-xs">{estimateDisclaimer}</p>}
      </div>
      
      <div className="mt-4">
        <Button 
          onClick={handleGetQuotesClick}
          className="w-full bg-brand-blue hover:bg-brand-blue/90"
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
