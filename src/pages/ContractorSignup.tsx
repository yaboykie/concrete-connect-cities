
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContractorSignupForm from '@/components/contractor-signup/ContractorSignupForm';
import { supabase } from '@/integrations/supabase/client';

const ContractorSignup = () => {
  // Real onSubmit handler connected to Supabase
  const handleSubmit = async (data: any) => {
    try {
      // Check if the user exists
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact);
      
      // Create random password
      const password = Math.random().toString(36).slice(-10);
      
      // Sign up the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        [isEmail ? 'email' : 'phone']: data.contact,
        password
      });
      
      if (authError) throw authError;
      
      // Insert into contractor_signups table
      const { error: insertError } = await supabase
        .from('contractor_signups')
        .insert([
          { 
            id: authData.user?.id,
            business_name: data.businessName,
            name: data.contactName,
            [isEmail ? 'email' : 'phone']: data.contact,
            signup_source: window.location.href || 'direct'
          }
        ]);
      
      if (insertError) throw insertError;
      
      // Return success response
      return { success: true, user: authData.user };
      
    } catch (error) {
      console.error('Error in contractor signup:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
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
