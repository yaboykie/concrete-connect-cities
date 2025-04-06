
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type SimpleQuoteFormProps = {
  onSubmit?: (data: any) => Promise<any>;
  utmParams?: Record<string, string>;
  stateLocation?: string;
};

const SimpleQuoteForm = ({ onSubmit, utmParams = {}, stateLocation = '' }: SimpleQuoteFormProps) => {
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced tracking function that uses the global tracking functions
  const trackInteraction = (eventName: string, additionalData = {}) => {
    if (window.gtag) {
      // Use direct gtag for standard events
      window.gtag('event', eventName, {
        form_name: 'simple_quote_form',
        state: stateLocation,
        ...additionalData
      });
      
      // For form-specific tracking events, use the enhanced tracking
      if (typeof window.trackFormInteraction === 'function') {
        window.trackFormInteraction(eventName, 'simple_quote_form', {
          state: stateLocation,
          ...additionalData
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission attempt
    trackInteraction('form_submit_attempt');
    
    // Form validation
    if (!name || !zipCode || !contact) {
      toast({
        title: "Please Complete All Required Fields",
        description: "Please fill out all required information to get your quotes.",
        variant: "destructive",
      });
      trackInteraction('form_validation_error', {
        missing_fields: [
          !name ? 'name' : null,
          !zipCode ? 'zipCode' : null,
          !contact ? 'contact' : null
        ].filter(Boolean).join(',')
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare form data with UTM parameters
    const formData = {
      name,
      zipCode,
      contact,
      details,
      ...utmParams
    };
    
    if (onSubmit) {
      try {
        // Use the parent component's submit handler
        const response = await onSubmit(formData);
        
        // Track successful conversion if the conversion tracking is available
        if (response?.lead_id && typeof window.trackFormConversion === 'function') {
          window.trackFormConversion(
            'AW-676763112',     // Your conversion ID
            'form_submission',  // Conversion label - update this with your actual label
            {
              ...formData,
              lead_id: response.lead_id
            }
          );
        }
        
        // Track successful submission
        trackInteraction('form_submit_success', {
          lead_id: response?.lead_id || 'unknown',
          matched_contractors: response?.matched_contractors || 0
        });
        
        // Reset form on success
        setName('');
        setZipCode('');
        setContact('');
        setDetails('');
      } catch (error) {
        console.error('Error in form submission:', error);
        // Track submission error
        trackInteraction('form_submit_error', {
          error_message: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback to default behavior if no onSubmit is provided
      setTimeout(() => {
        toast({
          title: "Quote Request Submitted",
          description: "We'll match you with local driveway concreters shortly. Thank you!",
        });
        setIsSubmitting(false);
        setName('');
        setZipCode('');
        setContact('');
        setDetails('');
        
        trackInteraction('form_submit_success_fallback');
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">Get a Free Driveway Quote – No Spam, No Pressure</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Your name"
            onFocus={() => trackInteraction('name_field_focus')}
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
          <Input 
            id="zipCode" 
            value={zipCode} 
            onChange={(e) => setZipCode(e.target.value)} 
            required 
            placeholder="Your ZIP code"
            onFocus={() => trackInteraction('zipcode_field_focus')}
          />
        </div>
        
        <div>
          <label htmlFor="contact" className="block text-sm font-medium mb-1">Phone or Email</label>
          <Input 
            id="contact" 
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
            required 
            placeholder="How should we contact you?"
            onFocus={() => trackInteraction('contact_field_focus')}
          />
        </div>
        
        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1">Project Details</label>
          <Textarea 
            id="details" 
            value={details} 
            onChange={(e) => setDetails(e.target.value)} 
            placeholder="Tell us about your driveway project"
            rows={3}
            onFocus={() => trackInteraction('details_field_focus')}
          />
        </div>
        
        <Button type="submit" className="w-full cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "→ Match Me with a Local Driveway Concreter"}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          By submitting, you agree to our Terms & Privacy Policy. 
          We'll connect you with contractors who may contact you.
        </p>
      </div>
    </form>
  );
};

// Add TypeScript declaration for the window object
declare global {
  interface Window {
    trackFormConversion?: (
      conversionId: string,
      conversionLabel: string,
      formData: any
    ) => void;
    trackFormInteraction?: (
      action: string,
      formName: string,
      additionalData: Record<string, any>
    ) => void;
  }
}

export default SimpleQuoteForm;
