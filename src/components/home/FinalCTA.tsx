
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import LeadCaptureDialog from '@/components/driveway-calculator/LeadCaptureDialog';

interface FinalCTAProps {
  estimateData?: {
    area: number;
    priceRange: string;
    stateName: string;
  } | null;
}

const FinalCTA = ({ estimateData }: FinalCTAProps) => {
  return null; // Removing the entire component
};

export default FinalCTA;
