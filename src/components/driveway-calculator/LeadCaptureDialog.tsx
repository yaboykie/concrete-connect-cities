import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area: number;
  priceRange: string;
  stateName: string;
  purpose?: 'email' | 'quotes';
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  zip_code: z.string().min(5, { message: "ZIP code is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LeadCaptureDialog({
  open,
  onOpenChange,
  area,
  priceRange,
  stateName,
  purpose = 'email',
}: LeadCaptureDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  
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
        console.error("Supabase error:", supabaseError);
        throw new Error(`Database error: ${supabaseError.message}`);
      }
      
      if (purpose === 'email') {
        try {
          const { error: functionError } = await supabase.functions.invoke('send-lead', {
            body: {
              name: data.name,
              email: data.email,
              zipCode: data.zip_code,
              estimate: priceRange,
              jobType: "Concrete Driveway"
            }
          });
          
          if (functionError) {
            console.warn("Email notification failed but lead was saved:", functionError);
          }
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
      onOpenChange(false);
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
  
  const dialogTitle = purpose === 'email' 
    ? "Get your driveway estimate by email" 
    : "Get matched with local driveway concreters";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {purpose === 'quotes' && (
            <p className="text-sm text-muted-foreground mt-2">
              We'll match you with up to 3 local driveway concreters, all rated 4.7★ or higher on Google Reviews
            </p>
          )}
        </DialogHeader>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-3">
            <p className="text-sm font-medium">Error: {submitError}</p>
            <p className="text-xs">Please try again or contact support if this persists.</p>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium mb-2">Your {stateName} Driveway Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Size:</p>
              <p className="font-semibold">{area} sq ft</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimate:</p>
              <p className="font-semibold text-green-700">{priceRange}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                {...form.register('phone')}
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="zip_code">ZIP Code *</Label>
              <Input
                id="zip_code"
                placeholder="Your ZIP code"
                {...form.register('zip_code')}
              />
              {form.formState.errors.zip_code && (
                <p className="text-red-500 text-xs">{form.formState.errors.zip_code.message}</p>
              )}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">
              🔒 Your details are only shared with concreters you approve.
            </p>
          </div>
          
          <DialogFooter>
            <div className="w-full">
              <Button type="submit" className="w-full">
                {isSubmitting 
                  ? "Sending..." 
                  : purpose === 'email' 
                    ? "Send My Estimate" 
                    : "See My Local Matches"
                }
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                You'll instantly see up to 3 concreters who match your estimate. No pressure. No spam.
              </p>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
