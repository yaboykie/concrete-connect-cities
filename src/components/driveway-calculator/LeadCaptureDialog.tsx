
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLeadForm } from './hooks/useLeadForm';
import { LeadFormDetails } from './components/LeadFormDetails';
import { LeadForm } from './components/LeadForm';

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area: number;
  priceRange: string;
  stateName: string;
  purpose?: 'email' | 'quotes';
}

export default function LeadCaptureDialog({
  open,
  onOpenChange,
  area,
  priceRange,
  stateName,
  purpose = 'email',
}: LeadCaptureDialogProps) {
  const { form, isSubmitting, submitError, onSubmit } = useLeadForm({
    purpose,
    area,
    priceRange,
    onSuccess: () => onOpenChange(false),
  });
  
  const dialogTitle = purpose === 'email' 
    ? "Get your driveway estimate by email" 
    : "Get matched with local driveway concreters";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {purpose === 'quotes' && (
            <p className="text-sm text-muted-foreground mt-2">
              We'll match you with up to 3 local driveway concreters, all rated 4.7★ or higher on Google Reviews
            </p>
          )}
        </DialogHeader>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-3">
            <p className="text-sm font-medium">Error: {submitError}</p>
            <p className="text-xs">Please try again or contact support if this persists.</p>
          </div>
        )}
        
        <LeadFormDetails 
          area={area}
          priceRange={priceRange}
          stateName={stateName}
        />
        
        <LeadForm 
          form={form}
          isSubmitting={isSubmitting}
          purpose={purpose}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
