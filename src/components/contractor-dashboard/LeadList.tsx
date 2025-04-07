
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAnalyticsTracking } from '@/hooks/useAnalyticsTracking';

interface Lead {
  lead_id: string;
  name: string;
  job_type: string;
  formatted_job_type: string;
  zip_code: string;
  created_at: string;
  campaign_id: string;
  campaign_name?: string;
  is_disputed?: boolean;
}

interface LeadListProps {
  userId: string;
}

const LeadList: React.FC<LeadListProps> = ({ userId }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [disputedLeads, setDisputedLeads] = useState<Record<string, boolean>>({});
  const { trackInteraction } = useAnalyticsTracking();

  useEffect(() => {
    fetchLeads();
    fetchDisputedLeads();
  }, [userId]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      // Get all campaigns for this contractor
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select('campaign_id, name')
        .eq('contractor_id', userId);

      if (campaignsError) throw campaignsError;

      if (!campaigns || campaigns.length === 0) {
        setLeads([]);
        setLoading(false);
        return;
      }

      const campaignIds = campaigns.map(c => c.campaign_id);
      const campaignNameMap = campaigns.reduce((acc, curr) => {
        acc[curr.campaign_id] = curr.name;
        return acc;
      }, {} as Record<string, string>);

      // Get leads matched to these campaigns
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .in('campaign_id', campaignIds)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Add campaign name to each lead
      const leadsWithCampaignNames = (data || []).map(lead => ({
        ...lead,
        campaign_name: campaignNameMap[lead.campaign_id] || 'Unknown Campaign'
      }));
      
      setLeads(leadsWithCampaignNames);
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
      const { data, error } = await supabase
        .from('lead_disputes')
        .select('lead_id')
        .eq('contractor_id', userId);

      if (error) throw error;

      const disputed = (data || []).reduce((acc, dispute) => {
        acc[dispute.lead_id] = true;
        return acc;
      }, {} as Record<string, boolean>);

      setDisputedLeads(disputed);
    } catch (error) {
      console.error('Error fetching disputed leads:', error);
    }
  };

  const handleDisputeLead = async (leadId: string, campaignId: string) => {
    try {
      const { error } = await supabase
        .from('lead_disputes')
        .insert([
          {
            lead_id: leadId,
            contractor_id: userId,
            campaign_id: campaignId,
            reason: 'Disputed by contractor'
          }
        ]);

      if (error) throw error;

      setDisputedLeads(prev => ({ ...prev, [leadId]: true }));
      trackInteraction('lead_disputed', 'contractor_dashboard');

      toast({
        title: "Lead reported",
        description: "We have received your report and will review it",
      });
    } catch (error) {
      console.error('Error disputing lead:', error);
      toast({
        title: "Error",
        description: "Failed to report lead",
        variant: "destructive",
      });
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
          <p className="text-gray-600">
            Create campaigns to start receiving leads in your area
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
                <TableHead>ZIP Code</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.lead_id}>
                  <TableCell>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {lead.formatted_job_type || lead.job_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.campaign_name}</TableCell>
                  <TableCell>{lead.zip_code}</TableCell>
                  <TableCell>
                    {disputedLeads[lead.lead_id] ? (
                      <div className="flex items-center text-amber-600 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Reported
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDisputeLead(lead.lead_id, lead.campaign_id)}
                      >
                        Report Bad Lead
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default LeadList;
