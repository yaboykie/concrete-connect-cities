
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  zip_code: z.string().min(5, { message: "ZIP code is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface UseLeadFormProps {
  purpose: 'email' | 'quotes';
  area: number;
  priceRange: string;
  onSuccess?: () => void;
}

export const useLeadForm = ({ purpose, area, priceRange, onSuccess }: UseLeadFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      zip_code: '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const { data: leadData, error: supabaseError } = await supabase.from("leads").insert([
        {
          lead_id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          zip_code: data.zip_code,
          job_type: "driveway",
          formatted_job_type: "Driveway Installation",
          status: "new",
          matched_contractor_ids: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          campaign_id: null,
        },
      ]).select();
      
      if (supabaseError) {
        throw new Error(`Database error: ${supabaseError.message}`);
      }
      
      if (purpose === 'email') {
        try {
          await supabase.functions.invoke('send-lead', {
            body: {
              name: data.name,
              email: data.email,
              zipCode: data.zip_code,
              estimate: priceRange,
              jobType: "Concrete Driveway"
            }
          });
        } catch (emailError) {
          console.warn("Email sending failed but lead was saved:", emailError);
        }
        
        toast({
          title: "Estimate Sent!",
          description: "We've emailed you your estimate!",
          duration: 5000,
        });
      } else {
        toast({
          title: "Request Sent",
          description: "We'll match you with local driveway concreters shortly!",
          duration: 5000,
        });
      }
      
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      console.error("Error in lead submission:", error);
      setSubmitError(error.message);
      toast({
        title: "Error",
        description: "There was a problem sending your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    submitError,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
