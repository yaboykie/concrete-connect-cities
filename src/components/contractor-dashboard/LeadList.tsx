
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import LeadTable, { Lead } from './leads/LeadTable';
import DisputeModal, { DISPUTE_REASONS } from './leads/DisputeModal';
import ViewDisputeModal, { DisputeDetails } from './leads/ViewDisputeModal';

// Interface for RPC responses
interface UserDisputeResponse {
  lead_id: string;
}

interface DisputeDetailResponse {
  reason: string;
  created_at: string;
}

interface LeadListProps {
  userId: string;
}

const LeadList: React.FC<LeadListProps> = ({ userId }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [disputedLeads, setDisputedLeads] = useState<string[]>([]);
  
  // Dispute modal state
  const [isDisputeDialogOpen, setIsDisputeDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [disputeReason, setDisputeReason] = useState<string>('');
  const [submittingDispute, setSubmittingDispute] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  
  // View dispute modal state
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
      // Properly type the RPC arguments
      const rpcArgs: { user_id: string } = { user_id: userId };
      
      const { data, error } = await supabase.rpc(
        'get_user_disputes', 
        rpcArgs
      ) as { data: UserDisputeResponse[] | null, error: any };
      
      if (error) throw error;
      
      if (data) {
        const leadIds = Array.isArray(data) ? data.map(item => item.lead_id) : [];
        setDisputedLeads(leadIds);
      }
    } catch (error) {
      console.error('Error fetching disputed leads:', error);
    }
  };

  const handleDisputeLead = (lead: Lead) => {
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
      // Properly type the RPC arguments
      const rpcArgs: { 
        p_lead_id: string, 
        p_contractor_id: string 
      } = { 
        p_lead_id: lead.lead_id,
        p_contractor_id: userId
      };
      
      const { data, error } = await supabase.rpc(
        'get_dispute_details', 
        rpcArgs
      ) as { data: DisputeDetailResponse[] | null, error: any };
      
      if (error) throw error;
      
      if (data && Array.isArray(data) && data.length > 0) {
        const disputeData = data[0];
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

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    
    if (value !== "Other") {
      setDisputeReason(value);
    } else {
      setDisputeReason('');
    }
  };

  const submitDispute = async () => {
    if (!selectedLead) return;
    
    let finalReason = selectedReason;
    
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
      
      // Properly type the RPC arguments
      const rpcArgs: {
        p_lead_id: string,
        p_contractor_id: string,
        p_campaign_id: string,
        p_reason: string
      } = {
        p_lead_id: selectedLead.lead_id,
        p_contractor_id: userId,
        p_campaign_id: campaignData.campaign_id,
        p_reason: finalReason
      };
      
      const { error } = await supabase.rpc(
        'submit_lead_dispute', 
        rpcArgs
      ) as { data: null, error: any };
      
      if (error) throw error;
      
      toast({
        title: "Dispute Submitted",
        description: "Your lead dispute has been submitted for review",
      });
      
      if (selectedLead.lead_id) {
        setDisputedLeads(prev => [...prev, selectedLead.lead_id]);
      }
      
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
        <LeadTable 
          leads={leads}
          disputedLeads={disputedLeads}
          onDispute={handleDisputeLead}
          onViewDispute={handleViewDispute}
        />
      )}

      <DisputeModal
        open={isDisputeDialogOpen}
        onOpenChange={setIsDisputeDialogOpen}
        selectedReason={selectedReason}
        setSelectedReason={handleReasonChange}
        disputeReason={disputeReason}
        setDisputeReason={setDisputeReason}
        onSubmit={submitDispute}
        submitting={submittingDispute}
      />

      <ViewDisputeModal
        open={isViewDisputeOpen}
        onOpenChange={setIsViewDisputeOpen}
        disputeDetails={currentDisputeDetails}
      />
    </div>
  );
};

export default LeadList;
