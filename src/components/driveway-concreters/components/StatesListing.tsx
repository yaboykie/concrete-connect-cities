
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check } from 'lucide-react';
import { locationData } from '../LocationData';
import { Button } from '@/components/ui/button';

interface StatesListingProps {
  scrollToQuoteForm: () => void;
}

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

const StatesListing: React.FC<StatesListingProps> = ({ scrollToQuoteForm }) => {
  const uniqueStates = getUniqueStates();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">We're Local Everywhere</h2>
          <p className="text-lg text-center text-gray-700 mb-8">
            Our network of concrete professionals spans all 50 states, ensuring you can find quality service no matter where you live.
          </p>
          
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
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatesListing;
