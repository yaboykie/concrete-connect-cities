
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
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
import { Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [matchedCampaignId, setMatchedCampaignId] = useState<string | null>(null);

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
    setConnectionError(null);
    
    try {
      // Call the Supabase edge function
      const { data: responseData, error } = await supabase.functions.invoke('send-lead', {
        body: data
      });

      if (error) {
        throw new Error(error.message);
      }

      // Store lead ID, match count and campaign ID if available
      if (responseData) {
        setLeadId(responseData.lead_id);
        setMatchCount(responseData.matched_contractors || 0);
        setMatchedCampaignId(responseData.matched_campaign_id || null);
      }

      toast.success("Thank you!", {
        description: "Your quote request has been received. We'll get back to you soon."
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
      const errorMessage = error instanceof Error ? error.message : 'Unable to submit your request';
      setConnectionError(errorMessage);
      toast.error("Something went wrong", {
        description: "Unable to submit your request. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (connectionError) {
    console.error('Supabase connection error in ContactForm:', connectionError);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {connectionError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0" />
          <span>
            Connection error: Please try again later.
          </span>
        </div>
      )}
      
      {leadId && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 flex items-center">
          <CheckCircle2 className="mr-2 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Request submitted successfully!</p>
            <p className="text-sm">Reference ID: {leadId}</p>
            {matchCount !== null && matchCount > 0 && (
              <p className="text-sm">Found {matchCount} contractor{matchCount !== 1 ? 's' : ''} in your area.</p>
            )}
            {matchedCampaignId && (
              <p className="text-sm">Matched with campaign: {matchedCampaignId}</p>
            )}
          </div>
        </div>
      )}
      
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
