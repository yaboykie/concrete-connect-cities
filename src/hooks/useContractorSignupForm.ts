import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import * as Yup from 'yup';
import { useAnalyticsTracking } from './useAnalyticsTracking';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  businessName: string;
  contactName: string;
  contact: string;
  website?: string; // honeypot field
}

interface FormErrors {
  [key: string]: string;
}

interface UseContractorSignupFormProps {
  onSubmit?: (data: any) => Promise<any>;
  stateLocation?: string;
}

const contractorSignupSchema = Yup.object().shape({
  businessName: Yup.string()
    .min(3, 'Business name must be at least 3 characters')
    .required('Business name is required'),
  contactName: Yup.string(),
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
  website: Yup.string(), // honeypot field should be empty
});

export const useContractorSignupForm = ({ 
  onSubmit, 
  stateLocation = '' 
}: UseContractorSignupFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    contactName: '',
    contact: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const { trackInteraction } = useAnalyticsTracking();

  const validateForm = async (): Promise<boolean> => {
    try {
      await contractorSignupSchema.validate(formData, { abortEarly: false });
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
      const fieldSchema = Yup.reach(contractorSignupSchema, fieldName) as Yup.AnySchema;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    trackInteraction(`${fieldName}_field_blur`, 'contractor_signup', {
      state: stateLocation
    });
  };

  const handleFieldFocus = (fieldName: string) => {
    trackInteraction(`${fieldName}_field_focus`, 'contractor_signup', {
      state: stateLocation
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    trackInteraction('contractor_signup_submit_attempt', 'contractor_signup', {
      state: stateLocation
    });
    
    if (formData.website) {
      console.log("Potential spam submission detected");
      setTimeout(() => {
        toast({
          title: "Thanks! Your account has been created.",
          description: "You'll receive a confirmation shortly.",
        });
        setFormData({
          businessName: '',
          contactName: '',
          contact: ''
        });
      }, 1500);
      return;
    }
    
    const isValid = await validateForm();
    if (!isValid) {
      trackInteraction('contractor_signup_error', 'contractor_signup', {
        missing_fields: Object.keys(formErrors).join(','),
        state: stateLocation
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const submissionData = {
      ...formData,
      form_type: 'contractor_signup',
    };
    
    if (onSubmit) {
      try {
        const result = await onSubmit(submissionData);
        
        if (!result.success) {
          throw new Error(result.error || 'Submission failed');
        }
        
        trackInteraction('contractor_signup_success', 'contractor_signup', {
          state: stateLocation
        });
        
        setFormData({
          businessName: '',
          contactName: '',
          contact: ''
        });
        
        toast({
          title: "You're in!",
          description: "Let's get your first 3 leads set up.",
        });
        
        setSubmissionSuccess(true);
      } catch (error) {
        console.error('Error in form submission:', error);
        
        trackInteraction('contractor_signup_error', 'contractor_signup', {
          error_message: error instanceof Error ? error.message : 'Unknown error',
          state: stateLocation
        });
        
        toast({
          title: "Signup Error",
          description: "That email or phone is already registered.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: "You're in!",
        description: "Let's get your first 3 leads set up.",
      });
      
      setIsSubmitting(false);
      setFormData({
        businessName: '',
        contactName: '',
        contact: ''
      });
      
      setSubmissionSuccess(true);
      
      trackInteraction('contractor_signup_success', 'contractor_signup', {
        state: stateLocation
      });
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
