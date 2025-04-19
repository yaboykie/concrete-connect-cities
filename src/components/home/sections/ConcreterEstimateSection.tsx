
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import LeadCaptureDialog from '@/components/driveway-calculator/LeadCaptureDialog';

interface ConcreterEstimateSectionProps {
  estimateData?: {
    area: number;
    priceRange: string;
    stateName: string;
  } | null;
}

export const ConcreterEstimateSection = ({ estimateData }: ConcreterEstimateSectionProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <section className="bg-white py-16 px-6 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">
        Ready to See Which Concreters Match Your Estimate?
      </h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        We'll match you with 2–3 concreters in your area who are rated 4.7★ or higher on Google — and are actually available to quote your job.
      </p>

      <div className="flex justify-center">
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-brand-blue text-white px-6 py-3 rounded-lg text-lg hover:bg-brand-blue/90 transition"
        >
          Get Matched with Local Pros <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        We only match you with concreters rated 4.7★ or higher on Google Reviews
      </p>

      <LeadCaptureDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        area={estimateData?.area ?? 0}
        priceRange={estimateData?.priceRange || 'Contact for quote'} 
        stateName={estimateData?.stateName || ''}
        purpose="quotes"
      />
    </section>
  );
};
