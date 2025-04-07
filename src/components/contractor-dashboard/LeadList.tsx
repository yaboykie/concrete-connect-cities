
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
import { Loader2, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

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

const LeadList: React.FC<LeadListProps> = ({ userId }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [disputedLeads, setDisputedLeads] = useState<string[]>([]);
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [disputeReason, setDisputeReason] = useState<string>('');
  const [submittingDispute, setSubmittingDispute] = useState(false);

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
        const leadIds = (data as { lead_id: string }[]).map(item => item.lead_id);
        setDisputedLeads(leadIds);
      }
    } catch (error) {
      console.error('Error fetching disputed leads:', error);
    }
  };

  const handleDisputeLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDisputeDialogOpen(true);
  };

  const submitDispute = async () => {
    if (!selectedLead || !disputeReason.trim()) return;
    
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
        p_reason: disputeReason
      });
      
      if (error) throw error;
      
      toast({
        title: "Dispute Submitted",
        description: "Your lead dispute has been submitted for review",
      });
      
      setDisputedLeads([...disputedLeads, selectedLead.lead_id]);
      setIsDisputeDialogOpen(false);
      setDisputeReason('');
      
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
                      <Badge variant="outline">Disputed</Badge>
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
              <label htmlFor="disputeReason" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                Reason for Dispute
              </label>
              <textarea
                id="disputeReason"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your reason here"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={submitDispute} disabled={submittingDispute}>
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
    </div>
  );
};

export default LeadList;
