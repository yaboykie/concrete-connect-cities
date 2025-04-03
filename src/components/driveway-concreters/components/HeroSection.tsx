
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const isMobile = useIsMobile();
  
  // Scroll to quote form function
  const scrollToQuoteForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="py-8 md:py-12 bg-gray-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Headline and Trust Signals */}
          <div className="lg:w-1/2 space-y-5 md:space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Get Free Quotes From Top-Rated Local Driveway Concreters
            </h1>
            
            <div className="text-lg text-gray-700">
              Matched instantly with trusted local pros.
              No spam, no pressure, just real quotes from local concreters you can trust.
            </div>
            
            {/* Mobile layout order: H1, form, trust, sales copy */}
            {isMobile && (
              <>
                {/* Form moved up on mobile */}
                <div className="mt-6" id="quote-form">
                  <QuoteForm service="concrete-driveway" />
                </div>
                
                {/* Trust Signals on mobile */}
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mt-8">
                  <h3 className="font-bold text-xl mb-3">Why Homeowners Trust Us</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-1" />
                      <span className="text-gray-700">All concreters are licensed, insured, and thoroughly vetted</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-1" />
                      <span className="text-gray-700">We only match with professionals rated 4.5 stars and above</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-1" />
                      <span className="text-gray-700">Free service with zero obligation to hire</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Desktop trust signals (only shown on desktop) */}
            {!isMobile && (
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl mb-3">Why Homeowners Trust Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                    <span className="text-gray-700">All concreters are licensed, insured, and thoroughly vetted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                    <span className="text-gray-700">We only match with professionals rated 4.5 stars and above</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                    <span className="text-gray-700">Free service with zero obligation to hire</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-lg text-gray-700 font-medium">
                  🏡 <span className="font-bold">Your Driveway, Your First Impression</span>
                </p>
                <p className="text-lg text-gray-700">
                  Make the best first impression with a beautiful concrete driveway that elevates your home's curb appeal and adds long-term value. Whether you're coming home after a long day or welcoming guests, a well-installed concrete driveway sets the tone for your entire property, instantly making it look more polished and well-maintained.
                </p>
                
                <p className="text-lg text-gray-700 font-medium">
                  ⚒️ <span className="font-bold">Get Matched With Top Concrete Pros in Your Area</span>
                </p>
                <p className="text-lg text-gray-700">
                  We instantly match you with vetted, local concreters who specialize in concrete driveways—ensuring that you're working with the most skilled and reliable professionals in your area. No middlemen, just the real experts who know how to deliver high-quality results.
                </p>
                
                <p className="text-lg text-gray-700 font-medium">
                  ⏱️ <span className="font-bold">Instant Quotes. Real Professionals.</span>
                </p>
                <p className="text-lg text-gray-700">
                  Get your free, no-obligation quotes in under 10 seconds, with a typical response time of just 1-2 business hours. Your time is valuable, and we make the process quick, easy, and hassle-free, without the long waits and pushy sales calls.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Quote Form (only shown on desktop) */}
          {!isMobile && (
            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-lg shadow-xl p-6" id="quote-form">
                <QuoteForm service="concrete-driveway" />
                <div className="mt-4 text-center">
                  <p className="text-gray-700">
                    Vetted concreters. Fast quotes. No pressure. Just real experts ready to take on your project.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
