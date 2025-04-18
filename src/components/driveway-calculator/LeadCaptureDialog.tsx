
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LeadCaptureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area: number;
  priceRange: string;
  stateName: string;
  purpose?: 'email' | 'quotes';
}

type FormValues = {
  name: string;
  email: string;
  phone: string;
  zip_code: string;
};

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
      // First, save to Supabase
      const { data: leadData, error: supabaseError } = await supabase.from("leads").insert([
        {
          lead_id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          phone: data.phone || '',  // Use empty string instead of null
          zip_code: data.zip_code || '',  // Use empty string instead of null
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
        // Send email notification via edge function
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
            // We don't throw here because we already saved the lead to the database
          }
        } catch (emailError) {
          console.warn("Email sending failed but lead was saved:", emailError);
          // We don't throw here because we already saved the lead to the database
        }
        
        toast({
          title: "Estimate Sent!",
          description: "We've emailed you your estimate!",
          duration: 5000,
        });
      } else {
        // Show quote matching success message
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
    : "Get matched with local concreters";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-3">
            <p className="text-sm font-medium">Error: {submitError}</p>
            <p className="text-xs">Please try again or contact support if this persists.</p>
          </div>
        )}
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Your full name"
              {...form.register('name', { required: true })}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs">Name is required</p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              {...form.register('email', { 
                required: true, 
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
              })}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs">Valid email is required</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                placeholder="Your phone number"
                {...form.register('phone')}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="zip_code">ZIP Code (optional)</Label>
              <Input
                id="zip_code"
                placeholder="Your ZIP code"
                {...form.register('zip_code')}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded text-sm">
            <p><strong>Your {stateName} Estimate</strong></p>
            <p>Area: {area} sq ft</p>
            <p>Price Range: {priceRange}</p>
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : purpose === 'email' ? "Send My Estimate" : "Match Me With Pros"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
