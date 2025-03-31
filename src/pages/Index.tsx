
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

const Index = () => {
  // Example location pages that would typically come from a database or CMS
  const exampleLocations = [
    { state: 'new-york', city: 'new-york-city', service: 'concrete-driveways' },
    { state: 'california', city: 'los-angeles', service: 'concrete-contractor' },
    { state: 'texas', city: 'houston', service: 'concrete-driveways' },
    { state: 'florida', city: 'miami', service: 'concrete-contractor' },
    { state: 'illinois', city: 'chicago', service: 'concrete-driveways' },
    { state: 'arizona', city: 'phoenix', service: 'concrete-contractor' },
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
        
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Find Local Concrete Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exampleLocations.map((location, index) => {
                const cityFormatted = location.city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                const stateFormatted = location.state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                const serviceFormatted = location.service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                
                return (
                  <Link 
                    key={index} 
                    to={`/locations/${location.state}/${location.city}/${location.service}`}
                    className="block bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center text-brand-blue mb-3">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span className="font-medium">{cityFormatted}, {stateFormatted}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{serviceFormatted}</h3>
                      <p className="text-gray-600 mb-4">
                        Find top-rated {serviceFormatted.toLowerCase()} services in {cityFormatted}.
                      </p>
                      <div className="text-brand-blue font-medium flex items-center">
                        View Services
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
