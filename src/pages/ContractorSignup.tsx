
import React from 'react';
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
      const authData = isEmail 
        ? await supabase.auth.signUp({
            email: data.contact,
            password
          })
        : await supabase.auth.signUp({
            phone: data.contact,
            password,
            options: {
              data: {
                name: data.contactName,
                business_name: data.businessName
              }
            }
          });
      
      if (authData.error) throw authData.error;
      
      // Insert into contractor_signups table
      const { error: insertError } = await supabase
        .from('contractor_signups')
        .insert([
          { 
            id: authData.data.user?.id,
            business_name: data.businessName,
            name: data.contactName,
            [isEmail ? 'email' : 'phone']: data.contact,
            signup_source: typeof window !== 'undefined' ? window.location.href || 'direct' : 'direct'
          }
        ]);
      
      if (insertError) throw insertError;
      
      // Return success response
      return { success: true, user: authData.data.user };
      
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
