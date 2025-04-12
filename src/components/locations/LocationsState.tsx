
import React from 'react';
import { useParams } from 'react-router-dom';
import SiteLayout from '@/components/layouts/SiteLayout';
import StateLocations from '@/components/driveway-concreters/StateLocations';

const LocationsState = () => {
  const { state } = useParams<{ state: string }>();
  console.log('Rendering LocationsState component with state:', state);
  
  if (!state) {
    return (
      <SiteLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">State Not Found</h1>
          <p>Please select a valid state from our locations page.</p>
        </div>
      </SiteLayout>
    );
  }
  
  return (
    <SiteLayout>
      <StateLocations state={state} />
    </SiteLayout>
  );
};

export default LocationsState;
