
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
}: LeadCaptureDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
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
    
    try {
      await supabase.from("leads").insert([
        {
          lead_id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          zip_code: data.zip_code || null,
          job_type: "driveway",
          formatted_job_type: "Driveway Installation",
          status: "new",
          matched_contractor_ids: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          campaign_id: null,
        },
      ]);
      
      toast({
        title: "Estimate Sent!",
        description: "We've emailed you your estimate!",
        duration: 5000,
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your estimate. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get your driveway estimate by email</DialogTitle>
        </DialogHeader>
        
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
              {isSubmitting ? "Sending..." : "Send My Estimate"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
