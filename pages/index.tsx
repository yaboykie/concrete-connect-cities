
import React from 'react';
import SiteLayout from '@/components/layouts/SiteLayout';
import SEO from '@/components/SEO';
import Home from '@/pages/Home';

export default function HomePage() {
  return (
    <SiteLayout>
      <SEO
        title="Get 3 Free Quotes | Concrete Driveway Contractors"
        description="Compare free quotes from local top-rated concrete driveway professionals near you."
      />
      <Home />
    </SiteLayout>
  );
}
