
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContractorDashboardLayout from '@/components/contractor-dashboard/ContractorDashboardLayout';
import CampaignList from '@/components/contractor-dashboard/CampaignList';
import LeadList from '@/components/contractor-dashboard/LeadList';
import { useAnalyticsTracking } from '@/hooks/useAnalyticsTracking';
import { toast } from '@/components/ui/use-toast';

const ContractorDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns');
  const navigate = useNavigate();
  const { trackInteraction } = useAnalyticsTracking();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        navigate('/contractorsignup');
        return;
      }
      setUser(data.session.user);
      setLoading(false);
      trackInteraction('dashboard_view_loaded', 'contractor_dashboard');
    };

    checkUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/contractorsignup');
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, trackInteraction]);

  const handleLogout = async () => {
    trackInteraction('logout_click', 'contractor_dashboard');
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/contractorsignup');
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-lg">Loading your dashboard...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Contractor Dashboard | Manage Your Campaigns</title>
        <meta name="description" content="Manage your campaigns and leads as a contractor" />
      </Helmet>

      <Header />
      
      <ContractorDashboardLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        user={user}
      >
        {activeTab === 'campaigns' && (
          <CampaignList userId={user.id} />
        )}
        
        {activeTab === 'leads' && (
          <LeadList userId={user.id} />
        )}
        
        {activeTab === 'billing' && (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Billing</h2>
            <p className="text-gray-600">
              Billing functionality coming soon. Stay tuned for updates!
            </p>
          </div>
        )}
      </ContractorDashboardLayout>
      
      <Footer />
    </>
  );
};

export default ContractorDashboard;
