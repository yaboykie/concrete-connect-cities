
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PriceEstimateDisplayProps {
  price: { min: number; max: number } | null;
  area: number;
  stateName: string;
  estimateDisclaimer?: string;
  onGetQuotes: (e: React.MouseEvent) => void;
}

const PriceEstimateDisplay: React.FC<PriceEstimateDisplayProps> = ({
  price,
  area,
  stateName,
  estimateDisclaimer,
  onGetQuotes
}) => {
  // Format numbers for display
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Only calculate costs if we have valid price and area
  const hasValidPrice = price && typeof price.min === 'number' && typeof price.max === 'number';
  const hasValidArea = area > 0;
  
  const minCost = hasValidPrice && hasValidArea ? formatCurrency(area * price.min) : '';
  const maxCost = hasValidPrice && hasValidArea ? formatCurrency(area * price.max) : '';

  console.log("PriceEstimateDisplay - Price data:", price);
  console.log("PriceEstimateDisplay - Area:", area);
  console.log("PriceEstimateDisplay - Calculated costs:", { minCost, maxCost });

  const { toast } = useToast();

  // Helper function to show a toast notification
  const showNoDataToast = () => {
    toast({
      description: `We're still gathering pricing data for ${stateName}. Please try a different state or concrete type.`,
      duration: 5000,
    });
  };

  return (
    <>
      {hasValidPrice && hasValidArea ? (
        <Card className="mt-6 bg-brand-yellow/20 border border-brand-yellow mb-4">
          <CardContent className="pt-6">
            <p className="mb-2">📐 <strong>Estimated Area:</strong> {area} sq ft</p>
            <p className="mb-2 text-lg font-bold">💲 <strong>Estimated Price Range:</strong> {minCost} – {maxCost}</p>
            <p className="text-sm text-gray-600">📍 Based on average {stateName} prices (updated 2025).</p>
            <p className="text-sm text-gray-600 mt-1">
              💬 Final pricing depends on site conditions like concrete depth, access, and prep work. This is a ballpark estimate.
            </p>
            <p className="text-sm text-gray-500 italic mt-2">
              "According to Forbes, upgrading your driveway can instantly improve how your home looks from the street — and may even increase its resale value."
            </p>
            {estimateDisclaimer && (
              <p className="text-sm text-gray-600 mt-2">{estimateDisclaimer}</p>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 mb-4">
          <p className="text-sm text-gray-700 text-center">
            We're still gathering pricing data for this selection. Please continue and we'll guide you.
          </p>
          <button 
            onClick={showNoDataToast}
            className="mt-2 text-sm text-blue-600 hover:underline mx-auto block"
          >
            Why am I seeing this message?
          </button>
        </div>
      )}

      <div className="mt-4">
        <a 
          href="#quote-form" 
          onClick={onGetQuotes}
          className="cta-button block w-full text-center text-lg py-4 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition-all"
        >
          👍 Estimate Look Good? Get 2–3 Free Quotes Now
        </a>
        <p className="text-center text-sm mt-3 text-gray-700">
          These top-rated concreters are ready to go — most have slots available this month and are taking new projects now.
        </p>
      </div>
    </>
  );
};

export default PriceEstimateDisplay;
