
import React from 'react';
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const DISPUTE_REASONS = [
  "Wrong number or unreachable",
  "Outside my service area",
  "Homeowner hired someone else already",
  "Not a real job (spam, competitor, etc.)",
  "Other"
];

interface DisputeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedReason: string;
  setSelectedReason: (reason: string) => void;
  disputeReason: string;
  setDisputeReason: (reason: string) => void;
  onSubmit: () => void;
  submitting: boolean;
}

const DisputeModal: React.FC<DisputeModalProps> = ({
  open,
  onOpenChange,
  selectedReason,
  setSelectedReason,
  disputeReason,
  setDisputeReason,
  onSubmit,
  submitting
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dispute Lead</DialogTitle>
          <DialogDescription>
            Please provide a reason for disputing this lead.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="disputeReason" className="text-sm font-medium leading-none">
              Select Reason
            </label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {DISPUTE_REASONS.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedReason === "Other" && (
            <div className="space-y-2">
              <label htmlFor="customReason" className="text-sm font-medium leading-none">
                Custom Reason <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="customReason"
                placeholder="Please explain why you're disputing this lead"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                className="h-24"
              />
            </div>
          )}
        </div>
        <Button 
          onClick={onSubmit} 
          disabled={submitting || !selectedReason || (selectedReason === "Other" && !disputeReason.trim())}
        >
          {submitting ? (
            <>
              Submitting <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            </>
          ) : (
            "Submit Dispute"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DisputeModal;
