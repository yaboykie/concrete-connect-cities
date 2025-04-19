
import React from 'react';
import { ConcreterEstimateSection } from './sections/ConcreterEstimateSection';

interface MatchEstimateSectionProps {
  estimateData?: {
    area: number;
    priceRange: string;
    stateName: string;
  } | null;
}

const MatchEstimateSection = ({ estimateData }: MatchEstimateSectionProps) => {
  return <ConcreterEstimateSection estimateData={estimateData} />;
};

export default MatchEstimateSection;
