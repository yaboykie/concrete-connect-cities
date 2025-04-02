
import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export interface LocationBreadcrumbProps {
  state: string;
  city: string;
}

const LocationBreadcrumb: React.FC<LocationBreadcrumbProps> = ({ state, city }) => {
  // Format state name and city for display
  const formattedState = state.toUpperCase();
  const formattedCity = city.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  // Format URL parameters
  const stateUrlParam = state.toLowerCase();
  
  return (
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
            <Link to="/concrete-services" className="text-gray-300 hover:text-white">
              Concrete Services
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/driveway-concreters/locations" className="text-gray-300 hover:text-white">
              Driveway Concreters
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={`/driveway-concreters/locations/${stateUrlParam}`} className="text-gray-300 hover:text-white">
              {formattedState}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbLink className="text-brand-yellow font-medium">
            {formattedCity}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default LocationBreadcrumb;
