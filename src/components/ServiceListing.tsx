
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Service {
  title: string;
  description: string;
}

interface ServiceListingProps {
  services: Service[];
  title?: string;
  subtitle?: string;
}

const ServiceListing: React.FC<ServiceListingProps> = ({ 
  services, 
  title = "Our Services", 
  subtitle = "We provide a wide range of concrete services to meet your needs" 
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start mb-4">
              <CheckCircle className="h-6 w-6 mr-2 text-brand-blue flex-shrink-0" />
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </div>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListing;
