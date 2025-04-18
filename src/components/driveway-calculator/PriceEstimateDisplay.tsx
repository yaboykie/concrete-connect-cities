
import React from 'react';
import { Button } from '@/components/ui/button';
import LeadCaptureDialog from './LeadCaptureDialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const { toast } = useToast();
  
  const handleGetQuotesClick = async (e: React.MouseEvent) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Submit lead with minimal info for "Get Free Quotes"
      const { error } = await supabase.from("leads").insert([
        {
          lead_id: crypto.randomUUID(),
          name: null,
          email: null,
          phone: null,
          zip_code: null,
          job_type: "driveway",
          formatted_job_type: "Driveway Installation",
          status: "new",
          matched_contractor_ids: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          campaign_id: null,
        },
      ]);
      
      if (error) {
        console.error("Supabase error:", error);
        setSubmitError(error.message);
        throw new Error(`Database error: ${error.message}`);
      }
      
      toast({
        title: "Request Sent",
        description: "We'll match you with contractors now.",
        duration: 5000,
      });
      
      // Call the passed onGetQuotes function if it exists
      if (onGetQuotes) {
        onGetQuotes(e);
      }
    } catch (error: any) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
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
      
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-3">
          <p className="text-sm font-medium">Error: {submitError}</p>
          <p className="text-xs">Please try again or contact support if this persists.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        <div className="flex flex-col">
          <Button 
            onClick={() => setDialogOpen(true)}
            variant="outline" 
            className="w-full mb-1"
          >
            📤 Email Me My Estimate
          </Button>
          <p className="text-xs text-gray-500 text-center px-2">
            We'll send your estimate straight to your inbox — no spam.
          </p>
        </div>
        <div className="flex flex-col">
          <Button 
            onClick={handleGetQuotesClick}
            disabled={isSubmitting}
            className="w-full mb-1"
          >
            {isSubmitting ? "Processing..." : "See Which Local Pros Match This Estimate"}
          </Button>
          <p className="text-xs text-gray-500 text-center px-2">
            We only show concreters rated 4.7★ or higher on Google.
          </p>
        </div>
      </div>
      
      <LeadCaptureDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        area={area}
        priceRange={price.totalRange} 
        stateName={stateName}
      />
    </div>
  );
}
