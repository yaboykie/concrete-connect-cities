
import React from 'react';
import SiteLayout from '@/components/layouts/SiteLayout';
import SEO from '@/components/SEO';
import SupabaseCheck from '@/components/SupabaseCheck';

export default function SupabaseCheckPage() {
  return (
    <SiteLayout>
      <SEO
        title="Supabase Connection Check"
        description="Verify the Supabase connection status for the application."
      />
      <SupabaseCheck />
    </SiteLayout>
  );
}
