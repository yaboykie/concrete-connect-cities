
import React from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export interface DisputeDetails {
  reason: string;
  created_at: string;
}

interface ViewDisputeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disputeDetails: DisputeDetails | null;
}

const ViewDisputeModal: React.FC<ViewDisputeModalProps> = ({
  open,
  onOpenChange,
  disputeDetails
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dispute Details</DialogTitle>
        </DialogHeader>
        {disputeDetails && (
          <div className="grid gap-4 py-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Reason</h4>
              <p className="text-gray-700 p-3 bg-gray-50 rounded">{disputeDetails.reason}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Submitted</h4>
              <p className="text-gray-700">
                {format(new Date(disputeDetails.created_at), 'PPpp')}
              </p>
            </div>
          </div>
        )}
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDisputeModal;
