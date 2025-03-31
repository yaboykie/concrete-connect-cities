
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { locationData } from './LocationData';
import { Button } from '@/components/ui/button';

const LocationsList: React.FC = () => {
  // Helper function to format location names consistently
  const formatStateName = (state: string) => {
    return state.length > 2 
      ? state.replace(/\b\w/g, l => l.toUpperCase()) 
      : state;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Affordable Driveway Concreters Locations</h1>
        <p className="text-lg text-gray-700 mb-8">
          Find professional and affordable concrete driveway contractors in your area. Our network of experienced 
          local contractors provides free, no-obligation quotes for all driveway projects.
        </p>
        
        <div className="bg-brand-blue/5 rounded-lg p-6 mb-8 border border-brand-blue/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
            Featured Location: Austin, TX
          </h2>
          <p className="mb-4">
            Looking for affordable concrete driveway services in Austin? Our local contractors offer 
            competitive pricing starting from just $4-$6 per square foot, with most projects costing 
            between $2,500-$5,000 for a complete installation.
          </p>
          <Link to="/driveway-concreters/locations/tx/austin">
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              Get Austin Driveway Quotes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationData.map((location, index) => {
            // Format the display name without changing the URL
            const displayName = location.full_name || 
              `${location.city}, ${formatStateName(location.state || '')}`;
              
            return (
              <Link 
                key={index}
                to={`/driveway-concreters/locations/${location.state?.toLowerCase() || ''}/${location.city?.toLowerCase().replace(/\s+/g, '-') || ''}`}
                className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
                  <h3 className="text-lg font-semibold">{displayName}</h3>
                </div>
                <p className="text-gray-600 mb-3">Find affordable driveway concreters in {displayName}, with prices starting from just $4-$6 per square foot.</p>
                <div className="text-brand-blue font-medium flex items-center text-sm">
                  View location details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default LocationsList;
