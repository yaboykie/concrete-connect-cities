
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Terms of Service | ConcreterQuotes.com" 
        description="Read our terms of service to understand the rules and regulations that govern the use of our concrete contractor matching service."
        canonicalUrl="/terms-of-service"
      />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Effective Date: April 3, 2025</p>
          
          <div className="prose prose-lg max-w-none">
            <p>Welcome to ConcreterQuotes.com. By using our website and services, you agree to the following terms.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Service Overview</h2>
            <p>ConcreterQuotes.com is a lead generation platform connecting homeowners with local concrete professionals. We do not perform any concrete services directly.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. No Guarantee of Service Quality</h2>
            <p>We do not guarantee pricing, availability, or workmanship. Any contract is solely between you and the contractor.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. User Obligations</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate information</li>
              <li>Use the platform for lawful purposes</li>
              <li>Not misuse or tamper with the platform</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Liability Disclaimer</h2>
            <p>We are not responsible for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Damages caused by contractors</li>
              <li>Disputes between you and contractors</li>
              <li>Mistakes in user-submitted information</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
            <p>All content and branding belongs to ConcreterQuotes.com. You may not reuse any material without written consent.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Governing Law</h2>
            <p>These terms are governed by U.S. law. Legal disputes must be handled in a U.S. court of competent jurisdiction.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to Terms</h2>
            <p>We may revise these terms. Updates will be posted with a new effective date.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
