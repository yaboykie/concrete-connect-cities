
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import HeroSection from './components/HeroSection';
import ValuePropositionSection from './components/ValuePropositionSection';
import ConcreteStylesSection from './components/ConcreteStylesSection';
import QuickFormSection from './components/QuickFormSection';
import StatesListing from './components/StatesListing';
import InlineQuoteForm from './InlineQuoteForm';

const LocationsList = () => {
  const isMobile = useIsMobile();
  
  // Scroll to quote form function
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <main className="flex-grow">
      {/* Hero Section with Quote Form */}
      <HeroSection />
      
      {/* Value Proposition Section */}
      <ValuePropositionSection scrollToQuoteForm={scrollToQuoteForm} />
      
      {/* Concrete Styles Section */}
      <ConcreteStylesSection />
      
      {/* Nationwide Coverage Quick Form Section */}
      <QuickFormSection />
      
      {/* Add new inline form section above "We're Local Everywhere" */}
      <InlineQuoteForm />
      
      {/* States Listing Section */}
      <StatesListing scrollToQuoteForm={scrollToQuoteForm} />
      
      {/* Sticky CTA Button for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
          <Button 
            className="cta-button text-lg w-full" 
            size="lg" 
            onClick={scrollToQuoteForm}
          >
            Get My Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </main>
  );
};

export default LocationsList;
