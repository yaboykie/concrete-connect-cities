
import React from 'react';
import { Shield, CheckCircle, MapPin } from 'lucide-react';

const ConcreterDifference: React.FC = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The ConcreterQuotes Difference</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We connect you with trusted driveway concrete professionals who deliver exceptional results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-brand-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">Verified Contractors</h3>
            <p className="text-gray-600">We pre-screen all driveway contractors for proper licensing, insurance, and quality workmanship.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-brand-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">Free, No-Obligation Quotes</h3>
            <p className="text-gray-600">Compare multiple quotes from top local driveway contractors with absolutely no commitment required.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-brand-blue" />
            </div>
            <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
            <p className="text-gray-600">Our network includes contractors who specialize in your specific area and understand local requirements.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcreterDifference;
