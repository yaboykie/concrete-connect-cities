import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UTMParams } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAnalyticsTracking } from './useAnalyticsTracking';
import * as Yup from 'yup';

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

const quoteFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  zipCode: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
    .required('ZIP code is required'),
  contact: Yup.string()
    .test(
      'is-phone-or-email',
      'Please enter a valid email or phone number',
      value => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+1[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
        return emailRegex.test(value || '') || phoneRegex.test(value || '');
      }
    )
    .required('Contact information is required'),
  details: Yup.string(),
});

export const useSimpleQuoteForm = ({ 
  onSubmit, 
  utmParams = {}, 
  stateLocation = '' 
}: UseSimpleQuoteFormProps) => {
  const { toast } = useToast();
  const { trackInteraction } = useAnalyticsTracking();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    zipCode: '',
    contact: '',
    details: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const validateForm = async (): Promise<boolean> => {
    try {
      await quoteFormSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (err: any) {
      if (err.inner) {
        const errors: FormErrors = {};
        err.inner.forEach((validationError: Yup.ValidationError) => {
          if (validationError.path) {
            errors[validationError.path] = validationError.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const validateField = async (fieldName: string): Promise<boolean> => {
    try {
      const fieldSchema = Yup.reach(quoteFormSchema, fieldName) as Yup.AnySchema;
      await fieldSchema.validate(formData[fieldName as keyof FormData]);
      
      if (formErrors[fieldName]) {
        const newErrors = { ...formErrors };
        delete newErrors[fieldName];
        setFormErrors(newErrors);
      }
      return true;
    } catch (err: any) {
      setFormErrors(prev => ({
        ...prev,
        [fieldName]: err.message
      }));
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFieldBlur = (fieldName: string) => {
    validateField(fieldName);
    
    trackInteraction(`${fieldName}_field_blur`, 'simple_quote_form', {
      state: stateLocation
    });
  };

  const handleFieldFocus = (fieldName: string) => {
    trackInteraction(fieldName, 'simple_quote_form', {
      state: stateLocation
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    trackInteraction('form_submit_attempt', 'simple_quote_form', {
      state: stateLocation
    });
    
    const isValid = await validateForm();
    if (!isValid) {
      trackInteraction('form_validation_error', 'simple_quote_form', {
        missing_fields: Object.keys(formErrors).join(','),
        state: stateLocation
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const submissionData = {
      ...formData,
      ...utmParams,
      form_type: 'simple_quote_form',
      page_path: window.location.pathname,
      landing_url: window.location.href
    };
    
    if (onSubmit) {
      try {
        const response = await onSubmit(submissionData);
        
        if (response?.lead_id && typeof window.trackFormConversion === 'function') {
          window.trackFormConversion(
            'AW-676763112',
            'form_submission',
            {
              ...submissionData,
              lead_id: response.lead_id
            }
          );
        }
        
        trackInteraction('form_submit_success', 'simple_quote_form', {
          lead_id: response?.lead_id || 'unknown',
          matched_contractors: response?.matched_contractors || 0,
          state: stateLocation
        });
        
        setFormData({
          name: '',
          zipCode: '',
          contact: '',
          details: ''
        });
        setSubmissionSuccess(true);
      } catch (error) {
        console.error('Error in form submission:', error);
        trackInteraction('form_submit_error', 'simple_quote_form', {
          error_message: error instanceof Error ? error.message : 'Unknown error',
          state: stateLocation
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
      setTimeout(() => {
        toast({
          title: "Quote Request Submitted",
          description: "We'll match you with local driveway concreters shortly. Thank you!",
        });
        setFormData({
          name: '',
          zipCode: '',
          contact: '',
          details: ''
        });
        setSubmissionSuccess(true);
        
        trackInteraction('form_submit_success_fallback', 'simple_quote_form', {
          state: stateLocation
        });
      }, 1500);
    }
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    submissionSuccess,
    handleInputChange,
    handleFieldBlur,
    handleFieldFocus,
    handleSubmit
  };
};
