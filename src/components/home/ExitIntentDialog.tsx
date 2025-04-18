
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ExitIntentDialogProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  exitEmail: string;
  setExitEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ExitIntentDialog: React.FC<ExitIntentDialogProps> = ({
  showModal,
  setShowModal,
  exitEmail,
  setExitEmail,
  onSubmit,
}) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Want to Keep Your Estimate?</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
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

export default ExitIntentDialog;
