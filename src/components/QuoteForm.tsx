
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';

interface QuoteFormProps {
  location?: string;
  service?: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ location = "", service = "" }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectDetails: '',
    serviceType: service || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Quote Request Submitted!",
        description: "A concrete specialist will contact you shortly.",
        duration: 5000,
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        projectDetails: '',
        serviceType: service || '',
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h3 className="text-2xl font-bold text-center mb-6">
        Get Your Free {service ? service.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Concrete'} Quote
        {location ? ` in ${location}` : ''}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
          
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div>
          <Input
            type="text"
            name="address"
            placeholder="Property Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Service Type</option>
            <option value="concrete-driveways">Concrete Driveway</option>
            <option value="concrete-patio">Concrete Patio</option>
            <option value="concrete-slab">Concrete Slab</option>
            <option value="concrete-repair">Concrete Repair</option>
            <option value="decorative-concrete">Decorative Concrete</option>
            <option value="other">Other Concrete Work</option>
          </select>
        </div>
        
        <div>
          <Textarea
            name="projectDetails"
            placeholder="Brief Project Details"
            value={formData.projectDetails}
            onChange={handleChange}
            className="w-full"
            rows={4}
          />
        </div>

        <div className="text-sm text-gray-500">
          <p className="flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0 mt-0.5" />
            <span>
              By submitting this form, you'll be connected with local, licensed concrete contractors. We respect your privacy.
            </span>
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="cta-button w-full text-lg py-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get Free Quotes Now'}
        </Button>
      </form>
    </div>
  );
};

export default QuoteForm;
