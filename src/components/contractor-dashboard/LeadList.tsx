
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAnalyticsTracking } from '@/hooks/useAnalyticsTracking';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Lead {
  lead_id: string;
  name: string;
  phone: string;
  email: string;
  job_type: string;
  formatted_job_type?: string;
  zip_code: string;
  created_at: string;
  campaign_id: string;
  campaign_name?: string;
  lead_type: 'standard' | 'priority';
  disputed?: boolean;
}

interface CampaignMap {
  [key: string]: string;
}

interface LeadListProps {
  userId: string;
}

const LeadList: React.FC<LeadListProps> = ({ userId }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<CampaignMap>({});
  const [disputes, setDisputes] = useState<string[]>([]);
  const [disputeDialog, setDisputeDialog] = useState({ open: false, leadId: '', campaignId: '' });
  const [disputeReason, setDisputeReason] = useState('');
  const [submittingDispute, setSubmittingDispute] = useState(false);
  
  const { trackInteraction } = useAnalyticsTracking();

  useEffect(() => {
    fetchLeads();
    fetchCampaignNames();
    fetchDisputes();
  }, [userId]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      // Fetch leads that match the contractor's campaigns
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .contains('matched_contractor_ids', [userId]);
      
      if (error) throw error;
      
      // Add lead type based on some business logic (this is a placeholder)
      const processedLeads = (data || []).map(lead => ({
        ...lead,
        lead_type: (lead.job_type.includes('premium') ? 'priority' : 'standard') as 'priority' | 'standard'
      }));
      
      setLeads(processedLeads as Lead[]);
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

  const fetchCampaignNames = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('campaign_id, name')
        .eq('contractor_id', userId);
      
      if (error) throw error;
      
      const campaignMap: CampaignMap = {};
      (data || []).forEach(campaign => {
        campaignMap[campaign.campaign_id] = campaign.name;
      });
      
      setCampaigns(campaignMap);
    } catch (error) {
      console.error('Error fetching campaign names:', error);
    }
  };

  const fetchDisputes = async () => {
    try {
      // Use custom SQL query instead of direct table access for now
      // until the types are regenerated
      const { data, error } = await supabase
        .rpc('get_user_disputes', { user_id: userId });
      
      if (error) throw error;
      
      setDisputes(data ? data.map((d: any) => d.lead_id) : []);
    } catch (error) {
      console.error('Error fetching disputes:', error);
    }
  };

  const openDisputeDialog = (leadId: string, campaignId: string) => {
    setDisputeDialog({ open: true, leadId, campaignId });
    setDisputeReason('');
  };

  const closeDisputeDialog = () => {
    setDisputeDialog({ open: false, leadId: '', campaignId: '' });
    setDisputeReason('');
  };

  const submitDispute = async () => {
    if (!disputeDialog.leadId || !disputeDialog.campaignId) return;
    
    setSubmittingDispute(true);
    
    try {
      // Use RPC call instead of direct table access
      const { error } = await supabase
        .rpc('submit_lead_dispute', {
          p_lead_id: disputeDialog.leadId,
          p_contractor_id: userId,
          p_campaign_id: disputeDialog.campaignId,
          p_reason: disputeReason || 'No reason provided'
        });
      
      if (error) throw error;
      
      // Update local state
      setDisputes(prev => [...prev, disputeDialog.leadId]);
      
      trackInteraction('lead_disputed', 'contractor_dashboard', {
        lead_id: disputeDialog.leadId,
        campaign_id: disputeDialog.campaignId
      });
      
      toast({
        title: "Lead disputed",
        description: "Your dispute has been recorded and will be reviewed.",
      });
      
      closeDisputeDialog();
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Leads</h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No leads yet</h3>
          <p className="text-gray-600 mb-4">
            Leads will appear here when they match your campaign criteria
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Lead Type</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>ZIP Code</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.lead_id}>
                  <TableCell>{new Date(lead.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={lead.lead_type === 'priority' ? 'success' : 'secondary'}>
                      {lead.lead_type === 'priority' ? 'Priority' : 'Standard'}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaigns[lead.campaign_id] || 'Unknown'}</TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.formatted_job_type || lead.job_type}</TableCell>
                  <TableCell>{lead.zip_code}</TableCell>
                  <TableCell>
                    {disputes.includes(lead.lead_id) ? (
                      <Badge variant="secondary" className="cursor-not-allowed">Disputed</Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:bg-red-50 border-red-200"
                        onClick={() => openDisputeDialog(lead.lead_id, lead.campaign_id)}
                      >
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={disputeDialog.open} onOpenChange={(open) => !open && closeDisputeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Bad Lead</DialogTitle>
            <DialogDescription>
              Please provide a reason why this lead does not meet your requirements.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Reason for reporting this lead..."
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDisputeDialog}>
              Cancel
            </Button>
            <Button 
              onClick={submitDispute} 
              disabled={submittingDispute}
              className="bg-red-600 hover:bg-red-700"
            >
              {submittingDispute ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadList;
