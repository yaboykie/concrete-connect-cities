
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import LeadCaptureDialog from '@/components/driveway-calculator/LeadCaptureDialog';

interface FinalCTAProps {
  area?: number;
  priceRange?: string;
  stateName?: string;
}

const FinalCTA = ({ 
  area = 0, 
  priceRange = 'Contact for quote', 
  stateName = '' 
}: FinalCTAProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-black text-white p-6 rounded-xl text-center space-y-3">
          <h2 className="text-2xl font-bold">Curious What a Concrete Driveway Costs in Your Area?</h2>
          <p className="text-sm text-gray-300">
            Get matched with up to 3 local concreters who can quote your job — all rated 4.7★ or higher on Google Reviews.
          </p>
          <Button 
            onClick={() => setDialogOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            Get Matched with Local Pros <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <LeadCaptureDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        area={area}
        priceRange={priceRange} 
        stateName={stateName}
        purpose="quotes"
      />
    </section>
  );
};

export default FinalCTA;
