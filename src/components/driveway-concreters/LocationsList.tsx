
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import { locationData } from './LocationData';
import { Button } from '@/components/ui/button';
import QuoteForm from '@/components/QuoteForm';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

// Helper function to get unique states from location data
const getUniqueStates = () => {
  const states = locationData.map(location => ({
    state: location.state,
    stateName: getStateName(location.state)
  }));
  
  // Remove duplicates by state code
  const uniqueStates = Array.from(new Map(states.map(item => [item.state, item])).values());
  
  // Sort alphabetically by state name
  return uniqueStates.sort((a, b) => a.stateName.localeCompare(b.stateName));
};

// Get full state name from abbreviation
const getStateName = (code: string) => {
  const stateNames: Record<string, string> = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
  };
  
  return stateNames[code] || code;
};

const LocationsList = () => {
  const uniqueStates = getUniqueStates();
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
      <section className="py-8 md:py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Left Column: Headline and Trust Signals */}
            <div className="lg:w-1/2 space-y-5 md:space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Driveway Concreters Near You
              </h1>
              
              {/* Mobile-specific layout */}
              {isMobile && (
                <>
                  {/* Trust Signals moved to top on mobile */}
                  <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">All concreters are licensed, insured, and thoroughly vetted</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">We only work with professionals rated 4.5 stars and above</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Free service with zero obligation to hire</span>
                    </div>
                  </div>
                  
                  {/* Mobile-only CTA button visible without scrolling */}
                  <div>
                    <Button className="cta-button text-lg w-full py-6" size="lg" onClick={scrollToQuoteForm}>
                      Get My Free Driveway Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </>
              )}
              
              {/* Desktop Trust Signals */}
              {!isMobile && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                    <span className="text-gray-700">All concreters are licensed, insured, and thoroughly vetted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                    <span className="text-gray-700">We only work with professionals rated 4.5 stars and above</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-brand-blue flex-shrink-0" />
                    <span className="text-gray-700">Free service with zero obligation to hire</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  A beautiful driveway doesn't just add curb appeal — it sets the tone for your entire home.
                </p>
                
                <p className="text-lg text-gray-700">
                  Whether you're welcoming guests or pulling in after a long day, a fresh concrete driveway gives you 
                  something to be proud of. It's clean, durable, and instantly improves how your home is seen.
                </p>
                
                <p className="text-lg text-gray-700">
                  And when it's time to sell? Real estate agents estimate a new driveway can add <strong>$10,000 to $20,000</strong> in resale value.
                </p>
                
                <p className="text-lg text-gray-700">
                  With ConcreterQuotes, you're matched instantly with top-rated driveway concreters in your area. No pressure, 
                  no spam — just fast, free quotes from vetted pros who typically reply within 1–2 business hours.
                </p>
              </div>
            </div>
            
            {/* Right Column: Quote Form */}
            <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-xl p-6" id="quote-form">
                <QuoteForm service="concrete-driveway" />
                <p className="text-center text-sm font-medium text-gray-600 mt-4">
                  We'll match you with local concreters within 2 business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Choose Professional Driveway Concreters?</h2>
            <p className="text-xl text-gray-200 mb-8">
              A new concrete driveway does more than just complete your home's exterior — it enhances curb appeal, 
              adds property value, and provides decades of low-maintenance durability that other materials simply can't match.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Built to Last</h3>
                <p className="text-gray-200">
                  Professional concrete driveways can last 30+ years with minimal maintenance, outperforming asphalt 
                  and gravel alternatives by decades.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Design Flexibility</h3>
                <p className="text-gray-200">
                  From stamped patterns to decorative aggregates and color options, concrete offers unmatched 
                  design versatility for any home style.
                </p>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">Benefits of Professional Driveway Installation:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Increases property value by up to 10%</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Superior strength handles heavy vehicles</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Environmentally friendly with recycled materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Snow removal is easier than other surfaces</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>More affordable long-term than other options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                  <span>Year-round installation in most climates</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <Button className="cta-button text-lg" size="lg" onClick={scrollToQuoteForm}>
                Get My Free Driveway Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* States Listing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Find Driveway Concreters Near You</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {uniqueStates.map((state, index) => (
                <Link 
                  key={index}
                  to={`/driveway-concreters/locations/${state.state.toLowerCase()}`}
                  className="flex items-center p-3 border rounded-md hover:border-brand-blue hover:bg-blue-50 transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-2 text-brand-blue" />
                  <span className="font-medium">{state.stateName}</span>
                </Link>
              ))}
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg mt-16">
              <h3 className="text-2xl font-bold mb-4">Why Choose ConcreterQuotes.com?</h3>
              <p className="mb-6">
                At ConcreterQuotes.com, we simplify the process of finding reliable driveway concreters. Our network of vetted 
                contractors specialize in driveways for residential and commercial properties of all sizes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Verified Professionals</h4>
                    <p className="text-gray-600">Every driveway concreter in our network is pre-screened and qualified</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Free Quotes</h4>
                    <p className="text-gray-600">No fees or obligations to get estimates for your driveway project</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Local Expertise</h4>
                    <p className="text-gray-600">Driveway concreters who understand your area's specific requirements</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fast Response</h4>
                    <p className="text-gray-600">Get matched with available driveway concreters within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button className="cta-button text-lg" size="lg" onClick={scrollToQuoteForm}>
                Get My Free Driveway Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
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
