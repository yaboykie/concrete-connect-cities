
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Loader2 } from 'lucide-react';
import CampaignFormModal from './CampaignFormModal';
import { useAnalyticsTracking } from '@/hooks/useAnalyticsTracking';

interface Campaign {
  campaign_id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius_km: number;
  job_types: string[];
  is_active: boolean;
  created_at: string;
  lead_type_preference: 'standard' | 'priority' | 'both';
  lead_cap_type: 'weekly' | 'monthly';
  lead_cap_limit: number;
}

interface CampaignListProps {
  userId: string;
}

const CampaignList: React.FC<CampaignListProps> = ({ userId }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackInteraction } = useAnalyticsTracking();

  useEffect(() => {
    fetchCampaigns();
  }, [userId]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('contractor_id', userId);
      
      if (error) throw error;
      
      // Type assertion to ensure the data matches our Campaign interface
      const typedCampaigns = data?.map(campaign => ({
        ...campaign,
        lead_type_preference: campaign.lead_type_preference as 'standard' | 'priority' | 'both',
        lead_cap_type: campaign.lead_cap_type as 'weekly' | 'monthly'
      })) || [];
      
      setCampaigns(typedCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast.error("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleCampaignCreated = () => {
    fetchCampaigns();
    setIsModalOpen(false);
    trackInteraction('campaign_created', 'contractor_dashboard');
    toast.success("Campaign created", {
      description: "You're now eligible to receive matching leads"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Campaign
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No campaigns yet</h3>
          <p className="text-gray-600 mb-4">
            Create your first campaign to start receiving leads
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Campaign
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Job Types</TableHead>
                <TableHead>Radius</TableHead>
                <TableHead>Lead Type</TableHead>
                <TableHead>Lead Cap</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.campaign_id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {campaign.job_types.map((type, i) => (
                        <Badge key={i} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{campaign.radius_km} km</TableCell>
                  <TableCell>
                    <Badge variant={campaign.lead_type_preference === 'priority' ? 'success' : 'secondary'}>
                      {campaign.lead_type_preference === 'both' ? 'Standard & Priority' : 
                       campaign.lead_type_preference === 'priority' ? 'Priority Only' : 'Standard Only'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {campaign.lead_cap_limit} / {campaign.lead_cap_type}
                  </TableCell>
                  <TableCell>
                    <Badge variant={campaign.is_active ? "success" : "secondary"}>
                      {campaign.is_active ? 'Active' : 'Paused'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(campaign.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <CampaignFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleCampaignCreated} 
        userId={userId}
      />
    </div>
  );
};

export default CampaignList;
