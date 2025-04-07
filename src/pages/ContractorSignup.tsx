
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContractorSignupForm from '@/components/contractor-signup/ContractorSignupForm';

const ContractorSignup = () => {
  // Mock onSubmit handler - in the future, this would connect to Supabase or an API
  const handleSubmit = async (data: any) => {
    // Mock API call
    console.log('Submitting contractor data:', data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock response
    return { success: true };
  };

  return (
    <>
      <Helmet>
        <title>Contractor Sign Up | Join Our Network</title>
        <meta name="description" content="Sign up as a contractor to join our network and receive leads." />
      </Helmet>

      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Contractor Sign Up</h1>
          <p className="text-gray-700">
            Join our network of trusted contractors and start receiving qualified leads today.
          </p>
        </div>
        
        <ContractorSignupForm onSubmit={handleSubmit} />
      </main>

      <Footer />
    </>
  );
};

export default ContractorSignup;
