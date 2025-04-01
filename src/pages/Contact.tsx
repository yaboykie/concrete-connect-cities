
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { CheckCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-brand-navy text-white p-8">
                <h1 className="text-3xl font-bold mb-6">Get Free Concrete Quotes</h1>
                
                <p className="mb-6">
                  Fill out the form to receive free, no-obligation quotes from trusted concrete professionals in your area.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <span>Free quotes from pre-screened concrete pros</span>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <span>Fast response times — typically 1-2 hours</span>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <span>Compare quotes from multiple contractors</span>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 text-brand-blue flex-shrink-0 mt-1" />
                    <span>No obligation to hire</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-6">Request Your Free Quote</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
