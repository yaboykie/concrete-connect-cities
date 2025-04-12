
import React from 'react';
import SiteLayout from '@/components/layouts/SiteLayout';
import SEO from '@/components/SEO';
import NotFound from '@/pages/NotFound';

export default function NotFoundPage() {
  return (
    <SiteLayout>
      <SEO
        title="Page Not Found | Concrete Driveway Quotes"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <NotFound />
    </SiteLayout>
  );
}
