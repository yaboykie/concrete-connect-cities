
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuoteForm from '@/components/QuoteForm';
import { LocationContentType } from './types';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface LocationHeroProps {
  locationContent: LocationContentType;
}

const LocationHero: React.FC<LocationHeroProps> = ({ locationContent }) => {
  // Extract city and state for breadcrumb navigation
  const [city, state] = locationContent.fullLocation.split(', ');
  const formattedState = state.replace(/\s+/g, '-').toLowerCase();
  const formattedCity = city.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-4">
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
              <BreadcrumbLink asChild>
                <Link to={`/driveway-concreters/locations/${formattedState}`} className="text-gray-300 hover:text-white">{state}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-brand-yellow font-medium">
                {city}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5">
            <div className="flex items-center text-brand-yellow mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">{city}</span>
            </div>
            <h1 className="text-white mb-4">
              Get 3 Free Quotes From Top {city} Driveway Concreters
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              Looking for reliable driveway contractors in {city}? We connect {state} homeowners with trusted local concrete pros who understand local building codes, regulations, and the unique challenges of {city} driveways.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>24-Hour Response Guarantee — No Waiting</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>{city}-Based Pros — No Out-of-Area Contractors</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Transparent Quotes — No Hidden Fees</span>
              </div>
            </div>
            <a href="#quote-form">
              <Button className="cta-button text-lg font-bold" size="lg">
                🎯 Get Matched with Local Concrete Pros
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
          
          <div className="lg:w-2/5" id="quote-form">
            <QuoteForm location={locationContent.fullLocation} service="driveway-concreters" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationHero;
