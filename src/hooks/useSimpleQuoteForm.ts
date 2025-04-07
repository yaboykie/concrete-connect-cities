
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { UTMParams } from '@/types';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  name: string;
  zipCode: string;
  contact: string;
  details: string;
}

interface FormErrors {
  [key: string]: string;
}

interface UseSimpleQuoteFormProps {
  onSubmit?: (data: any) => Promise<any>;
  utmParams?: UTMParams;
  stateLocation?: string;
}

export const useSimpleQuoteForm = ({ 
  onSubmit, 
  utmParams = {}, 
  stateLocation = '' 
}: UseSimpleQuoteFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    zipCode: '',
    contact: '',
    details: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

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

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }
    
    if (!formData.contact.trim()) {
      errors.contact = 'Contact information is required';
    } else {
      // Check if it's an email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Simple phone regex (handles various formats with or without country code)
      const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
      
      if (!emailRegex.test(formData.contact) && !phoneRegex.test(formData.contact)) {
        errors.contact = 'Please enter a valid email or phone number';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field when user makes changes
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    trackInteraction(fieldName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission attempt
    trackInteraction('form_submit_attempt');
    
    // Form validation
    if (!validateForm()) {
      trackInteraction('form_validation_error', {
        missing_fields: Object.keys(formErrors).join(',')
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare form data with UTM parameters
    const submissionData = {
      ...formData,
      ...utmParams,
      form_type: 'simple_quote_form',
      page_path: window.location.pathname,
      landing_url: window.location.href
    };
    
    if (onSubmit) {
      try {
        // Use the parent component's submit handler
        const response = await onSubmit(submissionData);
        
        // Track successful conversion if the conversion tracking is available
        if (response?.lead_id && typeof window.trackFormConversion === 'function') {
          window.trackFormConversion(
            'AW-676763112',     // Your conversion ID
            'form_submission',  // Conversion label - update this with your actual label
            {
              ...submissionData,
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
        setFormData({
          name: '',
          zipCode: '',
          contact: '',
          details: ''
        });
        setSubmissionSuccess(true);
      } catch (error) {
        console.error('Error in form submission:', error);
        // Track submission error
        trackInteraction('form_submit_error', {
          error_message: error instanceof Error ? error.message : 'Unknown error'
        });
        
        toast({
          title: "Submission Error",
          description: "There was a problem submitting your request. Please try again.",
          variant: "destructive",
          duration: 5000,
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
        setFormData({
          name: '',
          zipCode: '',
          contact: '',
          details: ''
        });
        setSubmissionSuccess(true);
        
        trackInteraction('form_submit_success_fallback');
      }, 1500);
    }
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    submissionSuccess,
    handleInputChange,
    handleFieldFocus,
    handleSubmit
  };
};
