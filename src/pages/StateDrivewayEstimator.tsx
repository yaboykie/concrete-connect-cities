
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StateDrivewayCalculator from '@/components/StateDrivewayCalculator';
import SEO from '@/components/SEO';
import SimpleQuoteForm from '@/components/driveway-concreters/components/SimpleQuoteForm';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { UTMParams } from '@/types';

export default function StateDrivewayEstimator() {
  const { state } = useParams<{ state: string }>();
  const location = useLocation();
  const stateDisplayName = state ? state.charAt(0).toUpperCase() + state.slice(1) : '';
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  
  // Extract UTM parameters from URL with improved tracking
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const utmData: UTMParams = {};
    
    // Collect all UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = queryParams.get(param);
      if (value) utmData[param] = value;
    });
    
    // Store UTM parameters in state and sessionStorage for cross-page tracking
    if (Object.keys(utmData).length > 0) {
      setUtmParams(utmData);
      sessionStorage.setItem('utm_data', JSON.stringify(utmData));
      console.log('UTM parameters detected and stored:', utmData);
    } else {
      // Check if we have UTM data from a previous page
      const storedUtmData = sessionStorage.getItem('utm_data');
      if (storedUtmData) {
        try {
          const parsedUtmData = JSON.parse(storedUtmData);
          setUtmParams(parsedUtmData);
          console.log('Retrieved UTM parameters from session:', parsedUtmData);
        } catch (e) {
          console.error('Error parsing stored UTM data:', e);
        }
      }
    }
  }, [location]);

  // Track page view with GA4
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: `${stateDisplayName} Concrete Driveway Cost Estimator`,
        page_location: window.location.href,
        page_path: location.pathname,
        state: stateDisplayName,
        ...utmParams // Include UTM parameters in the page view event
      });
    }
  }, [stateDisplayName, location, utmParams]);

  // Handle form submission with proper error handling and GA4 tracking
  const handleFormSubmit = async (formData: any) => {
    try {
      // Track form submission start
      if (window.gtag) {
        window.gtag('event', 'form_start', {
          form_name: 'concrete_quote_request',
          state: stateDisplayName,
          ...utmParams
        });
      }

      // Add UTM parameters and page information to the form data
      const enrichedFormData = {
        ...formData,
        ...utmParams,
        state: stateDisplayName,
        form_type: 'state_estimator',
        page_path: location.pathname,
        landing_url: window.location.href
      };
      
      console.log('Submitting lead with data:', enrichedFormData);
      
      // Submit the form data to the Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-lead', {
        body: enrichedFormData
      });
      
      if (error) throw new Error(error.message);
      
      console.log('Lead submission successful:', data);
      
      // Show success message
      toast({
        title: "Quote Request Submitted!",
        description: "We'll match you with top concrete pros. Most reply within 1-2 business hours.",
        duration: 5000,
      });
      
      // Track successful form submission with GA4
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          form_name: 'concrete_quote_request',
          state: stateDisplayName,
          lead_id: data?.lead_id || 'unknown',
          matched_contractors: data?.matched_contractors || 0,
          ...utmParams
        });
        
        // Track conversion for Google Ads
        if (typeof window.trackFormConversion === 'function') {
          window.trackFormConversion(
            'AW-676763112', 
            'form_submission',
            {
              ...enrichedFormData,
              lead_id: data?.lead_id
            }
          );
        }
      }
      
      return data;
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error message
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
      
      // Track form submission failure with GA4
      if (window.gtag) {
        window.gtag('event', 'form_error', {
          form_name: 'concrete_quote_request',
          error_message: error instanceof Error ? error.message : 'Unknown error',
          state: stateDisplayName,
          ...utmParams
        });
      }
      
      return null;
    }
  };
  
  return (
    <>
      <SEO
        title={`${stateDisplayName} Concrete Driveway Cost Estimator (2025 Prices)`}
        description={`Calculate how much a concrete driveway costs in ${stateDisplayName} with our free estimator tool. Updated 2025 pricing from local contractors.`}
      />
      <main className="container mx-auto px-4 py-8">
        <StateDrivewayCalculator />
        
        <div className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">About {stateDisplayName} Concrete Driveway Costs</h2>
          <p className="mb-4">
            Concrete driveway prices in {stateDisplayName} can vary based on several factors including the finish type, 
            size, preparation work required, and accessibility of your property.
          </p>
          <p className="mb-4">
            Our calculator provides a ballpark estimate based on average {stateDisplayName} prices from local concrete contractors.
            For an exact quote, we recommend getting in touch with several local professionals.
          </p>
        </div>
        
        <div id="quote-form" className="max-w-2xl mx-auto mt-16 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Get Free Quotes from {stateDisplayName} Concrete Contractors</h2>
          <SimpleQuoteForm onSubmit={handleFormSubmit} utmParams={utmParams} stateLocation={stateDisplayName} />
        </div>
      </main>
    </>
  );
}
