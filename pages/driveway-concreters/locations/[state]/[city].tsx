
import React from 'react';
import { GetServerSideProps } from 'next';
import { getLocationContent } from '@/components/driveway-concreters/LocationContent';
import SiteLayout from '@/components/layouts/SiteLayout';
import SEOHead from '@/components/driveway-concreters/SEOHead';
import LocationDetailsView from '@/components/driveway-concreters/LocationDetailsView';
import { LocationContentType } from '@/components/driveway-concreters/types';

interface LocationPageProps {
  locationContent: LocationContentType | null;
  state: string;
  city: string;
}

export default function LocationPage({ locationContent, state, city }: LocationPageProps) {
  return (
    <SiteLayout>
      {locationContent && (
        <SEOHead 
          locationContent={locationContent} 
          state={state} 
          city={city} 
        />
      )}
      <LocationDetailsView locationContent={locationContent} state={state} city={city} />
    </SiteLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const state = params?.state as string;
  const city = params?.city as string;

  try {
    const locationContent = await getLocationContent(state, city);
    return { props: { locationContent, state, city } };
  } catch (err) {
    console.error(`Error getting location content for ${city}, ${state}:`, err);
    return { props: { locationContent: null, state, city } };
  }
}
