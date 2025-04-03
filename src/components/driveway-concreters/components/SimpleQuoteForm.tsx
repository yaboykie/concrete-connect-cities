
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SimpleQuoteForm = () => {
  const [name, setName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Quote Request Submitted",
        description: "We'll match you with local driveway concreters shortly. Thank you!",
      });
      setIsSubmitting(false);
    }, 1500);
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

export default SimpleQuoteForm;
