
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Star, CheckCircle, Clock } from 'lucide-react';
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
        <h1 className="text-4xl font-bold mb-6 text-brand-blue">Transform Your Home's First Impression</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-4xl">
          A stunning concrete driveway doesn't just add curb appeal—it adds real value to your property. 
          Our network of skilled local contractors delivers beautiful, durable driveways that stand up to 
          weather, traffic, and time.
        </p>
        
        <div className="bg-gradient-to-r from-brand-blue/10 to-brand-yellow/10 rounded-lg p-8 mb-12 border border-brand-blue/20 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Star className="h-6 w-6 mr-2 text-brand-yellow" />
            Featured City: Austin, TX
          </h2>
          <p className="mb-4 text-lg">
            Austin homeowners are upgrading from cracked, dated driveways to modern concrete designs that 
            handle everything from scorching summers to flash floods. Local concrete pros offer competitive 
            pricing with most projects running $2,500-$5,000 for complete installation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              <span>Heat-resistant concrete mixes</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              <span>Local permitting expertise</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              <span>Decorative options available</span>
            </div>
          </div>
          <Link to="/driveway-concreters/locations/tx/austin">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-lg">
              Get Free Austin Driveway Quotes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Find Expert Concrete Contractors Near You</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locationData.map((location, index) => {
            // Format the display name without changing the URL
            const displayName = location.full_name || 
              `${location.city}, ${formatStateName(location.state || '')}`;
              
            // Generate unique selling points based on location patterns
            let uniquePoint = "Transform your property with durable concrete";
            
            // Simple logic to customize copy based on patterns in the location name
            if (location.state?.toLowerCase() === 'ca' || location.state?.toLowerCase() === 'fl') {
              uniquePoint = "Weather-resistant driveways for year-round beauty";
            } else if (location.state?.toLowerCase() === 'tx') {
              uniquePoint = "Heat-resistant concrete that stays cool underfoot";
            } else if (location.state?.toLowerCase() === 'ny' || location.state?.toLowerCase() === 'il') {
              uniquePoint = "Freeze-thaw resistant concrete built for harsh winters";
            } else if (location.state?.toLowerCase() === 'wa' || location.state?.toLowerCase() === 'or') {
              uniquePoint = "Rain-friendly designs with superior drainage";
            }
            
            return (
              <Link 
                key={index}
                to={`/driveway-concreters/locations/${location.state?.toLowerCase() || ''}/${location.city?.toLowerCase().replace(/\s+/g, '-') || ''}`}
                className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all bg-white group"
              >
                <div className="flex items-center mb-3">
                  <MapPin className="h-5 w-5 mr-2 text-brand-blue" />
                  <h3 className="text-lg font-semibold group-hover:text-brand-blue transition-colors">{displayName}</h3>
                </div>
                <p className="text-gray-700 mb-4">{uniquePoint}</p>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-1 text-brand-blue/70" />
                  <span>Most projects completed in 3-5 days</span>
                </div>
                <div className="text-brand-blue font-medium flex items-center text-sm">
                  Get free quotes from local experts
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Why Choose Our Concrete Contractor Network?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                <h3 className="font-semibold text-lg">Vetted Local Pros</h3>
              </div>
              <p className="text-gray-700">Every contractor in our network is licensed, insured, and has a proven track record of quality work.</p>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                <h3 className="font-semibold text-lg">Competitive Pricing</h3>
              </div>
              <p className="text-gray-700">Get multiple quotes to compare prices and find the best value for your specific driveway project.</p>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                <h3 className="font-semibold text-lg">Local Expertise</h3>
              </div>
              <p className="text-gray-700">Our contractors understand local building codes, permit requirements, and climate considerations.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationsList;
