
import React from 'react';
import { Input } from '@/components/ui/input';

interface FormErrors {
  [key: string]: string;
}

interface ContractorSignupFieldsProps {
  formData: {
    businessName: string;
    contactName: string;
    contact: string;
    website?: string; // honeypot field
  };
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (fieldName: string) => void;
  onFocus?: (fieldName: string) => void;
}

const ContractorSignupFields: React.FC<ContractorSignupFieldsProps> = ({ 
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
        <label htmlFor="businessName" className="block text-sm font-medium mb-1">Business Name</label>
        <Input 
          id="businessName" 
          name="businessName"
          value={formData.businessName} 
          onChange={onChange} 
          required 
          placeholder="Your business name"
          onFocus={() => handleFocus('businessName_field_focus')}
          onBlur={() => handleBlur('businessName')}
          className={errors.businessName ? 'border-red-500' : ''}
        />
        {errors.businessName && (
          <p className="text-sm text-red-500 mt-1">{errors.businessName}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="contactName" className="block text-sm font-medium mb-1">Contact Name</label>
        <Input 
          id="contactName"
          name="contactName" 
          value={formData.contactName} 
          onChange={onChange} 
          placeholder="Your name (optional)"
          onFocus={() => handleFocus('contactName_field_focus')}
          onBlur={() => handleBlur('contactName')}
          className={errors.contactName ? 'border-red-500' : ''}
        />
        {errors.contactName && (
          <p className="text-sm text-red-500 mt-1">{errors.contactName}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="contact" className="block text-sm font-medium mb-1">Email or Phone</label>
        <Input 
          id="contact"
          name="contact" 
          value={formData.contact} 
          onChange={onChange} 
          required 
          placeholder="Email or phone number"
          onFocus={() => handleFocus('contact_field_focus')}
          onBlur={() => handleBlur('contact')}
          className={errors.contact ? 'border-red-500' : ''}
        />
        {errors.contact && (
          <p className="text-sm text-red-500 mt-1">{errors.contact}</p>
        )}
      </div>
      
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        style={{ display: 'none' }}
        autoComplete="off"
        value={formData.website || ''}
        onChange={onChange}
      />
    </div>
  );
};

export default ContractorSignupFields;
