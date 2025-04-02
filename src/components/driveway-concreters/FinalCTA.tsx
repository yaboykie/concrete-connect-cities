
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { LocationContentType } from './types';
import { locationData } from './LocationData';

interface FinalCtaProps {
  locationContent: LocationContentType;
}

const FinalCTA: React.FC<FinalCtaProps> = ({ locationContent }) => {
  // Extract state and city from full location
  const [city, stateCode] = locationContent.fullLocation.split(', ');
  
  // Get nearby cities in the same state
  const nearbyCities = locationData
    .filter(location => 
      location.state.toLowerCase() === stateCode.toLowerCase() && 
      location.city.toLowerCase() !== city.toLowerCase()
    )
    .slice(0, 5); // Get up to 5 nearby cities
  
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">
          Transform Your Property With a Professional Concrete Driveway
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          A quality concrete driveway doesn't just improve your home's appearance—it increases your property value 
          and provides decades of reliable service. Get connected with {locationContent.fullLocation}'s best concrete professionals today.
        </p>
        <a href="#quote-form" className="cta-button inline-block text-lg py-4 px-8">
          Get Matched with Local Concrete Pros
        </a>
        
        {/* Nearby Cities Section */}
        {nearbyCities.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-blue-900">Nearby Cities We Serve</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nearbyCities.map((location, index) => {
                const cityUrl = location.city.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link 
                    key={index}
                    to={`/driveway-concreters/locations/${stateCode.toLowerCase()}/${cityUrl}`}
                    className="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                  >
                    <MapPin className="h-4 w-4 mr-2 text-brand-blue" />
                    <span className="font-medium">
                      Concrete Driveway Contractors in {location.city}, {stateCode}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FinalCTA;
