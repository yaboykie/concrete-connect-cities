
import React from 'react';
import { CheckCircle, Shield, Award, Star } from 'lucide-react';

interface LocalConsiderationsProps {
  weatherConsiderations: string;
  fullLocation: string;
}

const LocalConsiderations: React.FC<LocalConsiderationsProps> = ({ 
  weatherConsiderations, 
  fullLocation 
}) => {
  const [city, state] = fullLocation.split(', ');
  
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Expert Driveway Pros for {city} Homeowners</h2>
          
          <div className="bg-gradient-to-r from-brand-navy/5 to-brand-blue/5 p-6 rounded-lg shadow-sm mb-8">
            <p className="text-lg font-medium leading-relaxed">
              Don't trust your valuable property to just anyone. Our network includes only the most qualified concrete contractors in {city}—professionals who understand the unique challenges of {state}'s climate, local building codes, and distinctive environment.
            </p>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="h-6 w-6 mr-2 text-brand-blue" />
            Our Rigorous Vetting Process Ensures Excellence
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
              <div className="flex items-start">
                <Star className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">License Verification</h4>
                  <p className="text-gray-700">Every contractor is verified with local authorities and carries proper insurance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
              <div className="flex items-start">
                <Star className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Quality Workmanship</h4>
                  <p className="text-gray-700">We inspect past projects and verify customer satisfaction before approving contractors</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
              <div className="flex items-start">
                <Star className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Response Time</h4>
                  <p className="text-gray-700">All our {city} contractors commit to 24-hour response times for quotes and inquiries</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
              <div className="flex items-start">
                <Star className="h-5 w-5 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Customer Feedback</h4>
                  <p className="text-gray-700">Continuous monitoring of reviews and projects to ensure ongoing quality</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-concrete-light rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-brand-blue" />
              Why Our Local {city} Pros Deliver Superior Results
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Deep understanding of {city}'s unique soil conditions and drainage requirements</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Expertise navigating {city} permits and local regulations</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Knowledge of climate-appropriate concrete mixes that withstand {state}'s weather conditions</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                <p>Local presence ensures faster response for warranty service if ever needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalConsiderations;
