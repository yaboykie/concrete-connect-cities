
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { locationData } from './LocationData';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface StateLocationsProps {
  state: string;
}

const StateLocations: React.FC<StateLocationsProps> = ({ state }) => {
  // Format the state code to ensure correct display
  const stateCode = state.toUpperCase();
  
  // Get full state name if available, or use the code
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
  
  const stateName = getStateName(stateCode);
  
  // Filter cities by state
  const citiesInState = locationData.filter(
    location => location.state.toLowerCase() === state.toLowerCase()
  );
  
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/driveway-concreters/locations" className="text-gray-300 hover:text-white">Driveway Concreters</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-brand-yellow font-medium">
                  {stateName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Find Top Driveway Concrete Contractors in {stateName}
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-4xl">
            Get connected with reliable, experienced driveway contractors throughout {stateName}. 
            Our network includes only licensed professionals who understand local building codes, 
            weather conditions, and design preferences.
          </p>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Cities in {stateName}</h2>
        
        {citiesInState.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {citiesInState.map((location, index) => {
              const cityUrl = location.city.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <Link 
                  key={index}
                  to={`/driveway-concreters/locations/${state.toLowerCase()}/${cityUrl}`}
                  className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all bg-white group"
                >
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
                    <h3 className="text-lg font-semibold group-hover:text-brand-blue transition-colors">
                      {location.city}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Top-rated driveway concreters in {location.city}, {stateCode}
                  </p>
                  <div className="text-brand-blue font-medium flex items-center">
                    Get 3 free quotes 
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-700 mb-4">
              We're currently adding contractors in {stateName}. 
              Please check back soon or explore other states below.
            </p>
            <Link to="/driveway-concreters/locations" className="text-brand-blue font-medium hover:underline">
              View all locations
            </Link>
          </div>
        )}
        
        <h2 className="text-2xl font-bold mt-16 mb-6">Why Choose Our {stateName} Concrete Contractors?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 p-8 rounded-lg">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-brand-navy">Local Expertise</h3>
            <p>Our {stateName} contractors understand the unique challenges of local soil, weather, and building regulations.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-brand-navy">Quality Assurance</h3>
            <p>Every contractor in our network is pre-screened, licensed, and committed to delivering exceptional results.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-brand-navy">Competitive Pricing</h3>
            <p>Get multiple quotes to find the best value without compromising on quality for your driveway project.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StateLocations;
