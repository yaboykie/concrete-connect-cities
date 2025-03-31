
import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

interface LocalConsiderationsProps {
  weatherConsiderations: string;
  fullLocation: string;
}

const LocalConsiderations: React.FC<LocalConsiderationsProps> = ({ 
  weatherConsiderations, 
  fullLocation 
}) => {
  const [city] = fullLocation.split(', ');
  
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Local Knowledge = Better Results in {city}</h2>
          <p className="text-lg mb-6">{weatherConsiderations}</p>
          <div className="bg-concrete-light rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-brand-blue" />
              Why Local Concreters Beat Big Builders Every Time
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Local pros understand regional soil conditions and drainage requirements</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Familiarity with local building codes and permit processes</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Knowledge of climate-appropriate concrete mixes that last</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Quicker response times for questions or warranty service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalConsiderations;
