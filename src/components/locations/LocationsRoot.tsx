
import React from 'react';
import SiteLayout from '@/components/layouts/SiteLayout';
import MainLocationsView from '@/components/driveway-concreters/MainLocationsView';

const LocationsRoot = () => {
  console.log('Rendering LocationsRoot component');
  return (
    <SiteLayout>
      <MainLocationsView />
    </SiteLayout>
  );
};

export default LocationsRoot;
