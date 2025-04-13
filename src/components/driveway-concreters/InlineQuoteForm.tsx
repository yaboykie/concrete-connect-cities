
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InlineQuoteForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    jobType: '',
    zipCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, jobType: value }));
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
        phone: '',
        email: '',
        jobType: '',
        zipCode: '',
      });
    }, 1500);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Get matched with a local concreter in seconds – just fill out the form below.
        </h2>
        
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-1">
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
            
            <div className="md:col-span-1">
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
            
            <div className="md:col-span-1">
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div className="md:col-span-1">
              <Select 
                value={formData.jobType}
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driveway">New Driveway</SelectItem>
                  <SelectItem value="repair">Driveway Repair</SelectItem>
                  <SelectItem value="extension">Driveway Extension</SelectItem>
                  <SelectItem value="resurfacing">Resurfacing</SelectItem>
                  <SelectItem value="decorative">Decorative Concrete</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-1">
              <Input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div className="md:col-span-1">
              <Button 
                type="submit" 
                className="cta-button w-full h-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    <span className="mr-1">→</span> Match Me
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            By submitting, you agree to our Terms & Privacy Policy.
          </p>
        </form>
      </div>
    </section>
  );
};

export default InlineQuoteForm;
