
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Hammer, Construction, Shovel, Building, Truck, House } from 'lucide-react';

const Index = () => {
  // Example location pages with different concrete service categories
  const serviceCategories = [
    { 
      service: 'concrete-contractor',
      title: 'Concrete Contractor', 
      description: 'Find top-rated general concrete contractors for all your concrete projects.',
      icon: <Construction className="h-10 w-10 mb-2 text-brand-blue" />
    },
    { 
      service: 'concrete-driveways',
      title: 'Driveway Concreters', 
      description: 'Specialized contractors for beautiful, durable concrete driveways.',
      icon: <Truck className="h-10 w-10 mb-2 text-brand-blue" />
    },
    { 
      service: 'concrete-slab', 
      title: 'Concrete Slab', 
      description: 'Expert installation of concrete slabs for foundations, patios, and more.',
      icon: <Shovel className="h-10 w-10 mb-2 text-brand-blue" /> 
    },
    { 
      service: 'concrete-garage', 
      title: 'Concrete Garage', 
      description: 'Professional garage floor solutions and complete garage construction.',
      icon: <House className="h-10 w-10 mb-2 text-brand-blue" />
    },
    { 
      service: 'decorative-concrete', 
      title: 'Decorative Concrete', 
      description: 'Stamped, colored and decorative concrete options for your property.',
      icon: <Hammer className="h-10 w-10 mb-2 text-brand-blue" />
    },
    { 
      service: 'commercial-concrete', 
      title: 'Commercial Concrete', 
      description: 'Large-scale concrete solutions for commercial properties and businesses.',
      icon: <Building className="h-10 w-10 mb-2 text-brand-blue" />
    }
  ];

  // Example locations for demonstration purposes
  const exampleLocations = [
    { state: 'new-york', city: 'new-york-city' },
    { state: 'california', city: 'los-angeles' },
    { state: 'texas', city: 'houston' },
    { state: 'florida', city: 'miami' },
    { state: 'illinois', city: 'chicago' },
    { state: 'arizona', city: 'phoenix' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-brand-navy to-blue-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-white mb-6">Find Trusted Concrete Contractors Near You</h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              ConcreterQuotes.com connects homeowners with reliable, pre-screened concrete contractors across the USA. Get free quotes for your concrete project today!
            </p>
            <Button className="cta-button text-lg" size="lg">
              Get Your Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        <section className="section bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Find Local Concrete Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow text-center p-6">
                  <div className="flex justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    {exampleLocations.slice(0, 3).map((location, locIndex) => {
                      const cityFormatted = location.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      const stateFormatted = location.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                      
                      return (
                        <Link 
                          key={locIndex} 
                          to={`/locations/${location.state}/${location.city}/${category.service}`}
                          className="block text-brand-blue hover:underline"
                        >
                          <div className="flex items-center justify-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{cityFormatted}, {stateFormatted}</span>
                          </div>
                        </Link>
                      );
                    })}
                    <Link 
                      to="/locations" 
                      className="block text-brand-blue font-medium hover:underline flex items-center justify-center mt-2"
                    >
                      View More Locations
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
