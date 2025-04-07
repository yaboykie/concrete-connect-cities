
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, format } from 'date-fns';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Define Lead type with proper typing for lead_type
interface Lead {
  lead_id: string;
  name: string;
  email: string;
  phone: string;
  job_type: string;
  zip_code: string;
  created_at: string;
  status?: string;
  lead_type?: 'standard' | 'priority' | null;
}

interface LeadListProps {
  userId: string;
}

// Interface for dispute details
interface DisputeDetails {
  reason: string;
  created_at: string;
}

// Interface for RPC responses
interface UserDisputeResponse {
  lead_id: string;
}

interface DisputeDetailResponse {
  reason: string;
  created_at: string;
}

const DISPUTE_REASONS = [
  "Wrong number or unreachable",
  "Outside my service area",
  "Homeowner hired someone else already",
  "Not a real job (spam, competitor, etc.)",
  "Other"
];

const LeadList: React.FC<LeadListProps> = ({ userId }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [disputedLeads, setDisputedLeads] = useState<string[]>([]);
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [disputeReason, setDisputeReason] = useState<string>('');
  const [submittingDispute, setSubmittingDispute] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [isViewDisputeOpen, setIsViewDisputeOpen] = useState(false);
  const [currentDisputeDetails, setCurrentDisputeDetails] = useState<DisputeDetails | null>(null);

  useEffect(() => {
    fetchLeads();
    fetchDisputedLeads();
  }, [userId]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .contains('matched_contractor_ids', [userId]);
      
      if (error) throw error;
      
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to load leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDisputedLeads = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_disputes', { user_id: userId });
      
      if (error) throw error;
      
      if (data) {
        // Properly cast the data to the expected type and extract lead_id values
        const leadIds = (data as UserDisputeResponse[]).map(item => item.lead_id);
        setDisputedLeads(leadIds);
      }
    } catch (error) {
      console.error('Error fetching disputed leads:', error);
    }
  };

  const handleDisputeLead = (lead: Lead) => {
    // Check if already disputed
    if (disputedLeads.includes(lead.lead_id)) {
      toast({
        title: "Already Disputed",
        description: "You've already disputed this lead.",
        variant: "default",
      });
      return;
    }
    
    setSelectedLead(lead);
    setSelectedReason('');
    setDisputeReason('');
    setIsDisputeDialogOpen(true);
  };

  const handleViewDispute = async (lead: Lead) => {
    try {
      const { data, error } = await supabase.rpc('get_dispute_details', { 
        p_lead_id: lead.lead_id,
        p_contractor_id: userId
      });
      
      if (error) throw error;
      
      if (data && (data as DisputeDetailResponse[]).length > 0) {
        // Cast the data to the expected type
        const disputeData = (data as DisputeDetailResponse[])[0];
        setCurrentDisputeDetails(disputeData);
        setIsViewDisputeOpen(true);
      } else {
        toast({
          title: "Error",
          description: "No dispute details found",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching dispute details:', error);
      toast({
        title: "Error",
        description: "Failed to load dispute details",
        variant: "destructive",
      });
    }
  };

  const submitDispute = async () => {
    // Validate inputs
    if (!selectedLead) return;
    
    let finalReason = selectedReason;
    
    // If "Other" is selected, use the custom reason text
    if (selectedReason === "Other") {
      if (!disputeReason.trim()) {
        toast({
          title: "Missing Reason",
          description: "Please provide a reason for your dispute",
          variant: "destructive",
        });
        return;
      }
      finalReason = disputeReason;
    }
    
    try {
      setSubmittingDispute(true);
      
      // Find the campaign_id for this lead
      const { data: campaignData } = await supabase
        .from('campaigns')
        .select('campaign_id')
        .eq('contractor_id', userId)
        .single();
      
      if (!campaignData?.campaign_id) {
        toast({
          title: "Error",
          description: "Could not find a campaign for this dispute",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase.rpc('submit_lead_dispute', {
        p_lead_id: selectedLead.lead_id,
        p_contractor_id: userId,
        p_campaign_id: campaignData.campaign_id,
        p_reason: finalReason
      });
      
      if (error) throw error;
      
      toast({
        title: "Dispute Submitted",
        description: "Your lead dispute has been submitted for review",
      });
      
      setDisputedLeads([...disputedLeads, selectedLead.lead_id]);
      setIsDisputeDialogOpen(false);
      setDisputeReason('');
      setSelectedReason('');
      
    } catch (error) {
      console.error('Error submitting dispute:', error);
      toast({
        title: "Error",
        description: "Failed to submit dispute",
        variant: "destructive",
      });
    } finally {
      setSubmittingDispute(false);
    }
  };

  // Handle reason selection change
  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    
    // If it's not "Other", use the selected reason as the dispute reason
    if (value !== "Other") {
      setDisputeReason(value);
    } else {
      // Clear the custom reason field when selecting "Other"
      setDisputeReason('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Leads</h1>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No leads yet</h3>
          <p className="text-gray-600 mb-4">
            As leads become available that match your campaigns, they will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.lead_id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.job_type}</TableCell>
                  <TableCell>{lead.zip_code}</TableCell>
                  <TableCell>
                    {lead.email ? <a href={`mailto:${lead.email}`} className="hover:text-blue-500">{lead.email}</a> : 'N/A'}
                    <br />
                    {lead.phone ? <a href={`tel:${lead.phone}`} className="hover:text-blue-500">{lead.phone}</a> : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    {disputedLeads.includes(lead.lead_id) ? (
                      <Badge variant="destructive">Disputed</Badge>
                    ) : (
                      <Badge variant="secondary">New</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {disputedLeads.includes(lead.lead_id) ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDispute(lead)}
                        className="flex items-center gap-1"
                      >
                        <Info className="h-4 w-4" /> View Dispute
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleDisputeLead(lead)}>
                        Dispute
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dispute Dialog */}
      <Dialog open={isDisputeDialogOpen} onOpenChange={setIsDisputeDialogOpen}>
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
              <Select value={selectedReason} onValueChange={handleReasonChange}>
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

            {/* Custom reason field shown only when "Other" is selected */}
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
            onClick={submitDispute} 
            disabled={submittingDispute || !selectedReason || (selectedReason === "Other" && !disputeReason.trim())}
          >
            {submittingDispute ? (
              <>
                Submitting <Loader2 className="h-4 w-4 ml-2 animate-spin" />
              </>
            ) : (
              "Submit Dispute"
            )}
          </Button>
        </DialogContent>
      </Dialog>

      {/* View Dispute Details Dialog */}
      <Dialog open={isViewDisputeOpen} onOpenChange={setIsViewDisputeOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dispute Details</DialogTitle>
          </DialogHeader>
          {currentDisputeDetails && (
            <div className="grid gap-4 py-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Reason</h4>
                <p className="text-gray-700 p-3 bg-gray-50 rounded">{currentDisputeDetails.reason}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Submitted</h4>
                <p className="text-gray-700">
                  {format(new Date(currentDisputeDetails.created_at), 'PPpp')}
                </p>
              </div>
            </div>
          )}
          <Button variant="outline" onClick={() => setIsViewDisputeOpen(false)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadList;
