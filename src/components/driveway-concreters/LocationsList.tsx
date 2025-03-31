
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import { locationData } from './LocationData';
import { Button } from '@/components/ui/button';
import QuoteForm from '@/components/QuoteForm';
import { Separator } from '@/components/ui/separator';

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
  
  return (
    <main className="flex-grow">
      {/* Hero Section - Concrete Driveway Value Proposition */}
      <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Transform Your Home With a Professional Concrete Driveway</h1>
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
              <h3 className="text-xl font-semibold mb-4">Why Choose a Professional Concrete Driveway:</h3>
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
          </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Driveway?</h2>
                <p className="mb-6 text-lg">
                  Get free, no-obligation quotes from pre-screened concrete driveway contractors in your area. 
                  We'll match you with professionals who understand local building codes, soil conditions, and 
                  weather factors.
                </p>
                
                <div className="mb-6 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-brand-blue text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Fill out our simple form</h4>
                      <p className="text-gray-600">Tell us about your driveway project</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Get matched with pros</h4>
                      <p className="text-gray-600">We'll find qualified contractors in your area</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-brand-blue text-white rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Compare quotes & save</h4>
                      <p className="text-gray-600">Choose the best value for your project</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <QuoteForm service="concrete-driveway" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* States Listing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Find Concrete Driveway Contractors Near You</h2>
            
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
                At ConcreterQuotes.com, we simplify the process of finding reliable concrete professionals. Our network of vetted 
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
                    <p className="text-gray-600">Every contractor in our network is pre-screened and qualified</p>
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
                    <p className="text-gray-600">No fees or obligations to get estimates for your project</p>
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
                    <p className="text-gray-600">Contractors who understand your area's specific requirements</p>
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
                    <p className="text-gray-600">Get matched with available contractors within 24-48 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button className="cta-button text-lg" size="lg">
                Get Free Driveway Quotes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LocationsList;
