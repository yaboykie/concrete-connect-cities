
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { locationData } from './LocationData';

const LocationsList: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Driveway Concreters Locations</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationData.map((location, index) => (
            <Link 
              key={index}
              to={`/driveway-concreters/locations/${location.state.toLowerCase()}/${location.city.toLowerCase().replace(/\s+/g, '-')}`}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-center mb-2">
                <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
                <h3 className="text-lg font-semibold">{location.full_name}</h3>
              </div>
              <p className="text-gray-600">Find top-rated driveway concreters in {location.full_name}.</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LocationsList;
