
import { useState } from 'react';
import * as Yup from 'yup';
import { supabase } from '@/integrations/supabase/client';
import { useAnalyticsTracking } from './useAnalyticsTracking';

interface FormData {
  name: string;
  latitude: number | null;
  longitude: number | null;
  zipCode: string;
  radiusKm: number;
  jobTypes: string[];
}

interface FormErrors {
  [key: string]: string;
}

interface UseContractorCampaignFormProps {
  userId: string;
  onSuccess: () => void;
}

const campaignSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Campaign name must be at least 3 characters')
    .required('Campaign name is required'),
  latitude: Yup.number()
    .nullable()
    .test('coordinates-or-zip', 'Either coordinates or ZIP code is required', function(value) {
      const { longitude, zipCode } = this.parent;
      return (value !== null && longitude !== null) || zipCode.length > 0;
    }),
  longitude: Yup.number()
    .nullable()
    .test('coordinates-or-zip', 'Either coordinates or ZIP code is required', function(value) {
      const { latitude, zipCode } = this.parent;
      return (value !== null && latitude !== null) || zipCode.length > 0;
    }),
  zipCode: Yup.string()
    .test('coordinates-or-zip', 'Either coordinates or ZIP code is required', function(value) {
      const { latitude, longitude } = this.parent;
      return (latitude !== null && longitude !== null) || value.length > 0;
    }),
  radiusKm: Yup.number()
    .min(5, 'Minimum radius is 5 km')
    .max(100, 'Maximum radius is 100 km')
    .required('Service radius is required'),
  jobTypes: Yup.array()
    .min(1, 'Select at least one job type')
    .required('Job types are required'),
});

export const useContractorCampaignForm = ({ userId, onSuccess }: UseContractorCampaignFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    latitude: null,
    longitude: null,
    zipCode: '',
    radiusKm: 25,
    jobTypes: [],
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackInteraction } = useAnalyticsTracking();

  const validateForm = async (): Promise<boolean> => {
    try {
      await campaignSchema.validate(formData, { abortEarly: false });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'latitude' || name === 'longitude') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? null : parseFloat(value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear the error for this field when user makes changes
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    setFormData(prev => {
      const updatedJobTypes = checked
        ? [...prev.jobTypes, jobType]
        : prev.jobTypes.filter(type => type !== jobType);
      
      return {
        ...prev,
        jobTypes: updatedJobTypes,
      };
    });
    
    // Clear job type error if it exists
    if (formErrors.jobTypes && formData.jobTypes.length > 0) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.jobTypes;
        return newErrors;
      });
    }
  };

  const handleRadiusChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      radiusKm: value,
    }));
    
    // Clear radius error if it exists
    if (formErrors.radiusKm) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.radiusKm;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    trackInteraction('campaign_create_attempt', 'contractor_dashboard');
    
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: If only ZIP code provided, could convert to lat/lng here
      // For now, we'll just use one or the other
      
      const { error } = await supabase
        .from('campaigns')
        .insert([
          {
            contractor_id: userId,
            name: formData.name,
            latitude: formData.latitude,
            longitude: formData.longitude,
            radius_km: formData.radiusKm,
            job_types: formData.jobTypes,
            is_active: true,
          }
        ]);
      
      if (error) throw error;
      
      trackInteraction('campaign_created', 'contractor_dashboard', {
        job_types: formData.jobTypes.join(','),
        radius_km: formData.radiusKm
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error creating campaign:', error);
      trackInteraction('campaign_create_error', 'contractor_dashboard', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleJobTypeChange,
    handleRadiusChange,
    handleSubmit
  };
};
