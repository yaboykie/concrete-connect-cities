
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSimpleQuoteForm } from '@/hooks/useSimpleQuoteForm';
import QuoteFormFields from './QuoteFormFields';
import { UTMParams } from '@/types';

type SimpleQuoteFormProps = {
  onSubmit?: (data: any) => Promise<any>;
  utmParams?: UTMParams;
  stateLocation?: string;
};

const SimpleQuoteForm = ({ onSubmit, utmParams = {}, stateLocation = '' }: SimpleQuoteFormProps) => {
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleFieldBlur,
    handleFieldFocus,
    handleSubmit
  } = useSimpleQuoteForm({
    onSubmit,
    utmParams,
    stateLocation
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">Get a Free Driveway Quote – No Spam, No Pressure</h3>
      
      <QuoteFormFields 
        formData={formData}
        errors={formErrors}
        onChange={handleInputChange}
        onBlur={handleFieldBlur}
        onFocus={handleFieldFocus}
      />
      
      <Button type="submit" className="w-full cta-button mt-4" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "→ Match Me with a Local Driveway Concreter"}
      </Button>
      
      <p className="text-xs text-gray-500 text-center mt-2">
        By submitting, you agree to our Terms & Privacy Policy. 
        We'll connect you with contractors who may contact you.
      </p>
    </form>
  );
};

export default SimpleQuoteForm;
