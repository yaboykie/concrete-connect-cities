
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConcreterSignupConfirm() {
  const navigate = useNavigate();
  const [leadCount, setLeadCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  
  // Calculate the price based on lead count
  const monthlyPrice = leadCount * 20;
  
  useEffect(() => {
    // Check if we have the signup data in session storage
    const signupData = sessionStorage.getItem('contractor_signup_data');
    if (!signupData) {
      // Redirect back to the first page if no data
      navigate('/concretersignup');
      return;
    }
    
    try {
      const data = JSON.parse(signupData);
      setEmail(data.email);
    } catch (error) {
      console.error('Error parsing stored signup data:', error);
    }
  }, [navigate]);
  
  const handlePayment = async () => {
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please complete the previous form first.",
        variant: "destructive",
      });
      navigate('/concretersignup');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Update the record with the lead count selection
      const { data: contractorData, error: fetchError } = await supabase
        .from('contractor_signups')
        .select('id')
        .eq('email', email)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (fetchError || !contractorData || contractorData.length === 0) {
        throw new Error('Could not find your registration');
      }
      
      const contractorId = contractorData[0].id;
      
      // Update the record with plan selection
      const { error: updateError } = await supabase
        .from('contractor_signups')
        .update({
          selected_plan_leads: leadCount,
          billing_status: 'trial',
          // We'll update with Stripe customer ID after payment
        })
        .eq('id', contractorId);
      
      if (updateError) throw updateError;
      
      // In a real implementation, we would:
      // 1. Call Stripe to create a checkout session
      // 2. Redirect to Stripe checkout
      // 3. Process webhook to update the customer_id and status
      
      // For this demo, we'll simulate success and redirect directly
      // In a real implementation, you would redirect to the Stripe checkout
      toast({
        title: "Plan selected!",
        description: "Moving to payment page...",
      });
      
      // Simulate a delay for the "payment process"
      setTimeout(() => {
        // Store lead count in session storage for thank you page
        sessionStorage.setItem('selected_lead_count', leadCount.toString());
        navigate('/concretersignup/thank-you');
      }, 1500);
      
    } catch (error) {
      console.error('Error processing plan selection:', error);
      toast({
        title: "Something went wrong",
        description: "Could not process your plan selection. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Select Your Lead Plan | Concreter Sign Up</title>
        <meta name="description" content="Choose how many leads you want to receive each month" />
      </Helmet>

      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Almost Done — Choose Your Lead Plan</h1>
            <p className="text-lg text-gray-700">
              We'll match you with real homeowners looking for driveways. Your first 3 leads are covered in your $3 trial.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">How many leads do you want per month?</h2>
              <div className="py-4">
                <Slider
                  min={5}
                  max={100}
                  step={5}
                  value={[leadCount]}
                  onValueChange={(value) => setLeadCount(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>5 leads</span>
                  <span>100 leads</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 space-y-2">
              <p className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>You've selected: <strong>{leadCount} leads/month</strong></span>
              </p>
              <p className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>Monthly Cost: <strong>${monthlyPrice}</strong></span>
              </p>
              <p className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>First 3 leads are included in your $3 trial</span>
              </p>
              <p className="flex items-start">
                <span className="text-green-600 mr-2">✔️</span>
                <span>After lead #3, you'll have 24 hours to cancel risk-free</span>
              </p>
            </div>
            
            <Button 
              onClick={handlePayment} 
              className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Secure My Plan & Pay $3 Today"}
            </Button>
            
            <p className="text-sm text-gray-600 mt-4">
              You won't be billed for your monthly lead plan until you receive your 4th lead.
              You'll have 24 hours after your 3rd lead to cancel and walk away. Any extra leads sent during that window will be free if you cancel.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
