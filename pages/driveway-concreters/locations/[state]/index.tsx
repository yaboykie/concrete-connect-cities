
import React from 'react';
import { GetServerSideProps } from 'next';
import SiteLayout from '@/components/layouts/SiteLayout';
import SEO from '@/components/SEO';
import StateLocationsView from '@/components/driveway-concreters/StateLocationsView';

interface StatePageProps {
  state: string;
}

export default function StatePage({ state }: StatePageProps) {
  return (
    <SiteLayout>
      <SEO
        title={`Concrete Driveway Contractors in ${state} | Get Free Quotes`}
        description={`Find top concrete driveway contractors in ${state}. Compare free quotes from local pros and get the best price for your project.`}
        canonicalUrl={`/driveway-concreters/locations/${state}`}
      />
      <StateLocationsView state={state} />
    </SiteLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const state = params?.state as string;
  return { props: { state } };
}
