
import React from 'react';
import { Button } from '@/components/ui/button';
import { useContractorSignupForm } from '@/hooks/useContractorSignupForm';
import ContractorSignupFields from './ContractorSignupFields';

type ContractorSignupFormProps = {
  onSubmit?: (data: any) => Promise<any>;
  stateLocation?: string;
};

const ContractorSignupForm = ({ onSubmit, stateLocation = '' }: ContractorSignupFormProps) => {
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleFieldBlur,
    handleFieldFocus,
    handleSubmit
  } = useContractorSignupForm({
    onSubmit,
    stateLocation
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">Contractor Sign-Up</h3>
      
      <ContractorSignupFields 
        formData={formData}
        errors={formErrors}
        onChange={handleInputChange}
        onBlur={handleFieldBlur}
        onFocus={handleFieldFocus}
      />
      
      <Button 
        type="submit" 
        className="w-full cta-button mt-4" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Create Account"}
      </Button>
      
      <p className="text-xs text-gray-500 text-center mt-2">
        By signing up, you agree to our Terms & Privacy Policy.
      </p>
    </form>
  );
};

export default ContractorSignupForm;
