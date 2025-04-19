
import React from 'react';
import { Button } from '@/components/ui/button';
import LeadCaptureDialog from './driveway-calculator/LeadCaptureDialog';

interface QuoteFormModalProps {
  buttonText?: string;
  buttonClassName?: string;
  triggerClassName?: string;
  area?: number;
  priceRange?: string;
  stateName?: string;
}

const QuoteFormModal = ({
  buttonText = "Get My Free Quote",
  buttonClassName = "cta-button",
  triggerClassName = "",
  area = 0,
  priceRange = "Contact for quote",
  stateName = "",
}: QuoteFormModalProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button 
        onClick={() => setOpen(true)} 
        className={buttonClassName}
      >
        {buttonText}
      </Button>

      <LeadCaptureDialog
        open={open}
        onOpenChange={setOpen}
        area={area}
        priceRange={priceRange}
        stateName={stateName}
        purpose="quotes"
      />
    </>
  );
};

export default QuoteFormModal;
