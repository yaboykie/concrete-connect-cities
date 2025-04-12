
import React from 'react';
import SiteLayout from '@/components/layouts/SiteLayout';
import SEO from '@/components/SEO';
import MainLocationsView from '@/components/driveway-concreters/MainLocationsView';

export default function LocationsPage() {
  return (
    <SiteLayout>
      <SEO
        title="Concrete Driveway Contractors Across the USA | Find Local Pros"
        description="Browse our directory of concrete driveway contractors by location. Find and compare top-rated professionals in your city or state."
        canonicalUrl="/driveway-concreters/locations"
      />
      <MainLocationsView />
    </SiteLayout>
  );
}
