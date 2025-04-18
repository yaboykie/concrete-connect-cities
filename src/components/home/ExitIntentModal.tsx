
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ExitIntentModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  exitEmail: string;
  setExitEmail: (email: string) => void;
}

const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ 
  showModal, 
  setShowModal, 
  exitEmail, 
  setExitEmail 
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!exitEmail) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to receive your estimate",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save the lead to Supabase
      const leadId = crypto.randomUUID();
      const { error: supabaseError } = await supabase.from("leads").insert([
        {
          lead_id: leadId,
          name: "Exit Intent User",
          email: exitEmail,
          phone: "",
          zip_code: "",
          job_type: "driveway",
          formatted_job_type: "Driveway Estimate",
          status: "new",
          matched_contractor_ids: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
      
      if (supabaseError) {
        console.error("Error saving lead:", supabaseError);
        throw new Error(supabaseError.message);
      }
      
      // Also send email notification via edge function
      try {
        await supabase.functions.invoke('send-lead', {
          body: {
            name: "Exit Intent User",
            email: exitEmail,
            zipCode: "",
            estimate: "Exit intent estimate request",
            jobType: "Concrete Driveway"
          }
        });
      } catch (emailError) {
        console.warn("Email notification failed but lead was saved:", emailError);
        // We don't throw here because we already saved the lead
      }
      
      setShowModal(false);
      toast({
        title: "Email Sent",
        description: `We've sent your estimate to ${exitEmail}`,
        variant: "default",
        duration: 5000
      });
      setExitEmail('');
      
      // Track the conversion if available
      if (typeof window.trackFormConversion === 'function') {
        window.trackFormConversion(
          'AW-676763112',
          'form_submission',
          {
            lead_id: leadId,
            lead_type: 'exit_intent'
          }
        );
      }
      
    } catch (error) {
      console.error('Error submitting exit intent form:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't send your estimate. Please try again later.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Want to Keep Your Estimate?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="mt-2 text-sm text-gray-700">
            If you're not ready to get quotes yet, we can email you your estimate so you have it on hand — no pressure, no spam.
          </p>
          <Input 
            type="email" 
            placeholder="Your email" 
            value={exitEmail}
            onChange={(e) => setExitEmail(e.target.value)}
            className="mt-3 w-full border p-2 rounded-md" 
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send My Estimate'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
