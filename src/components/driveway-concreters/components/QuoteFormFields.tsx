
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FormErrors {
  [key: string]: string;
}

interface QuoteFormFieldsProps {
  formData: {
    name: string;
    zipCode: string;
    contact: string;
    details: string;
  };
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (fieldName: string) => void;
  onFocus?: (fieldName: string) => void;
}

const QuoteFormFields: React.FC<QuoteFormFieldsProps> = ({ 
  formData, 
  errors, 
  onChange,
  onBlur,
  onFocus 
}) => {
  const handleFocus = (fieldName: string) => {
    if (onFocus) {
      onFocus(fieldName);
    }
  };
  
  const handleBlur = (fieldName: string) => {
    if (onBlur) {
      onBlur(fieldName);
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
        <Input 
          id="name" 
          name="name"
          value={formData.name} 
          onChange={onChange} 
          required 
          placeholder="Your name"
          onFocus={() => handleFocus('name_field_focus')}
          onBlur={() => handleBlur('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
        <Input 
          id="zipCode"
          name="zipCode" 
          value={formData.zipCode} 
          onChange={onChange} 
          required 
          placeholder="Your ZIP code"
          onFocus={() => handleFocus('zipcode_field_focus')}
          onBlur={() => handleBlur('zipCode')}
          className={errors.zipCode ? 'border-red-500' : ''}
        />
        {errors.zipCode && (
          <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="contact" className="block text-sm font-medium mb-1">Phone or Email</label>
        <Input 
          id="contact"
          name="contact" 
          value={formData.contact} 
          onChange={onChange} 
          required 
          placeholder="How should we contact you?"
          onFocus={() => handleFocus('contact_field_focus')}
          onBlur={() => handleBlur('contact')}
          className={errors.contact ? 'border-red-500' : ''}
        />
        {errors.contact && (
          <p className="text-sm text-red-500 mt-1">{errors.contact}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="details" className="block text-sm font-medium mb-1">Project Details</label>
        <Textarea 
          id="details"
          name="details" 
          value={formData.details} 
          onChange={onChange} 
          placeholder="Tell us about your driveway project"
          rows={3}
          onFocus={() => handleFocus('details_field_focus')}
          onBlur={() => handleBlur('details')}
        />
      </div>
    </div>
  );
};

export default QuoteFormFields;
