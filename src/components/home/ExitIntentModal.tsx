
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    toast({
      title: "Email Sent",
      description: `We've sent your estimate to ${exitEmail}`,
      variant: "success",
      duration: 5000
    });
    setExitEmail('');
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
          <Button type="submit" className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
            Send My Estimate
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
