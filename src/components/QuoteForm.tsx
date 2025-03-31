
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
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

  // Convert service string to title case for display
  const getFormattedServiceName = (serviceStr: string) => {
    return serviceStr ? serviceStr.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Concrete';
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h3 className="text-2xl font-bold text-center mb-4">
        Get 3 Free {getFormattedServiceName(service)} Quotes
        {location ? ` in ${location}` : ''}
      </h3>
      
      <div className="mb-6 space-y-2">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0 mt-0.5" />
          <span className="text-sm">Local pros who know local building codes</span>
        </div>
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0 mt-0.5" />
          <span className="text-sm">No calls from random contractors</span>
        </div>
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 text-brand-blue flex-shrink-0 mt-0.5" />
          <span className="text-sm">Transparent pricing — no surprises</span>
        </div>
      </div>
      
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
          <Select 
            value={formData.serviceType}
            onValueChange={(value) => handleSelectChange(value, 'serviceType')}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Project Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-driveway">New Driveway Installation</SelectItem>
              <SelectItem value="driveway-repair">Driveway Repair/Resurfacing</SelectItem>
              <SelectItem value="patio">Concrete Patio</SelectItem>
              <SelectItem value="sidewalk">Sidewalk/Walkway</SelectItem>
              <SelectItem value="foundation">Foundation Work</SelectItem>
              <SelectItem value="decorative">Decorative/Stamped Concrete</SelectItem>
              <SelectItem value="other">Other Concrete Work</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Textarea
            name="projectDetails"
            placeholder="Brief Project Details"
            value={formData.projectDetails}
            onChange={handleChange}
            className="w-full"
            rows={3}
          />
        </div>

        <Button 
          type="submit" 
          className="cta-button w-full text-lg py-4 font-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Get Free Quotes Now'}
        </Button>
        
        <div className="text-sm text-center text-gray-500 mt-2">
          <p>
            🔒 No spam. No pressure. Just real quotes from real concreters.
          </p>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
