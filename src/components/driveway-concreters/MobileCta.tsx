
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileCtaProps {
  scrollTo?: string;
  buttonText?: string;
}

const MobileCta: React.FC<MobileCtaProps> = ({ 
  scrollTo = "#quote-form",
  buttonText = "Get My Free Quotes" 
}) => {
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
      <a 
        href={scrollTo} 
        className="cta-button block w-full text-center text-lg py-4"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default MobileCta;
