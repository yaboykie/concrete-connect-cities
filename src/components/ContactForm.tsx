
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  jobType: z.string({ required_error: 'Please select a concrete job type' }),
  zipCode: z.string().min(5, { message: 'Please enter a valid zip code' }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  closeModal?: () => void;
}

const ContactForm = ({ onSuccess, closeModal }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      jobType: '',
      zipCode: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Call the Supabase edge function
      const { data: responseData, error } = await supabase.functions.invoke('send-lead', {
        body: data
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Thank you!",
        description: "Your quote request has been received. We'll get back to you soon.",
        duration: 5000,
      });

      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (closeModal) {
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Something went wrong",
        description: "Unable to submit your request. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concrete Job Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select concrete job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="driveway">Driveway</SelectItem>
                    <SelectItem value="patio">Patio</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                    <SelectItem value="sidewalk">Sidewalk</SelectItem>
                    <SelectItem value="steps">Steps</SelectItem>
                    <SelectItem value="stamped-concrete">Stamped Concrete</SelectItem>
                    <SelectItem value="repair">Concrete Repair</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="Your zip code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full cta-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Compare My Free Quotes Now"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
