
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
              <BreadcrumbLink as={Link} to="/" className="text-gray-300 hover:text-white">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/driveway-concreters/locations" className="text-gray-300 hover:text-white">
                Driveway Concreters
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to={`/driveway-concreters/locations/${formattedState}`} className="text-gray-300 hover:text-white">
                {state}
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
              Get 3 Free Quotes From Top NYC Driveway Contractors Today
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              Looking for reliable driveway contractors in the five boroughs? We connect New Yorkers with trusted local concrete pros who understand NYC building codes, regulations, and the unique challenges of city driveways.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>24-Hour Response Guaranteed — No Waiting</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>NYC-Based Pros — No Out-of-State Contractors</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <span>Transparent Quotes — No Hidden NYC Fees</span>
              </div>
            </div>
            <a href="#quote-form">
              <Button className="cta-button text-lg font-bold" size="lg">
                🎯 Get 3 Free Driveway Quotes in 24 Hours
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
