
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileCtaProps {
  scrollTo?: string;
  buttonText?: string;
}

const MobileCta: React.FC<MobileCtaProps> = ({ 
  scrollTo = "#quoteform",
  buttonText = "Get My Free Quotes" 
}) => {
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(scrollTo);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
      <a 
        href={scrollTo} 
        onClick={handleClick}
        className="cta-button block w-full text-center text-lg py-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default MobileCta;
