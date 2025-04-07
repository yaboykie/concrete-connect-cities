import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import CampaignList from './CampaignList';
import LeadList from './LeadList';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContractorDashboard = () => {
  const { user, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState('campaigns');
  const [contractorData, setContractorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate('/login');
    } else if (user) {
      fetchContractorData();
    }
  }, [user, userLoading, navigate]);

  const fetchContractorData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contractor_signups')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      setContractorData(data);
    } catch (error) {
      console.error('Error fetching contractor data:', error);
      toast({
        title: "Error",
        description: "Failed to load your profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium">Loading your dashboard...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null; // Redirect handled in useEffect
  }

  return (
    <>
      <Helmet>
        <title>Contractor Dashboard | Manage Your Campaigns</title>
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {contractorData?.business_name || 'Contractor'}
          </h1>
          <p className="text-gray-600">
            Manage your campaigns and view your leads
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns" className="space-y-6">
            <CampaignList userId={user.id} />
          </TabsContent>
          
          <TabsContent value="leads" className="space-y-6">
            <LeadList userId={user.id} />
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your business and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Business Name</h3>
                  <p>{contractorData?.business_name || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Contact Name</h3>
                  <p>{contractorData?.name || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Email</h3>
                  <p>{contractorData?.email || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Phone</h3>
                  <p>{contractorData?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Primary Location</h3>
                  <p>{contractorData?.primary_town || 'Not provided'}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </>
  );
};

export default ContractorDashboard;
