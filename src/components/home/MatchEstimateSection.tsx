
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import LeadCaptureDialog from '@/components/driveway-calculator/LeadCaptureDialog';

interface MatchEstimateSectionProps {
  estimateData?: {
    area: number;
    priceRange: string;
    stateName: string;
  } | null;
}

const MatchEstimateSection = ({ estimateData }: MatchEstimateSectionProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const renderMatchPropositionSection = () => (
    <section className="bg-white py-16 px-6 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">
        Ready to See Which Concreters Match Your Estimate?
      </h2>

      <div className="flex justify-center">
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-brand-blue text-white px-6 py-3 rounded-lg text-lg hover:bg-brand-blue/90 transition"
        >
          Get Matched with Local Pros <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );

  const renderLocalProsSection = () => (
    <section className="bg-gray-50 py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-center">
          <Button 
            onClick={() => setDialogOpen(true)}
            className="bg-brand-blue text-white px-6 py-3 rounded-lg text-lg hover:bg-brand-blue/90 transition"
          >
            Get Matched with Local Pros <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {renderMatchPropositionSection()}
      {renderLocalProsSection()}
      <LeadCaptureDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        area={estimateData?.area ?? 0}
        priceRange={estimateData?.priceRange || 'Contact for quote'} 
        stateName={estimateData?.stateName || ''}
        purpose="quotes"
      />
    </>
  );
};

export default MatchEstimateSection;
