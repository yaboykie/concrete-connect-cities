
import React from 'react';
import SiteLayout from '@/components/layouts/SiteLayout';
import SEO from '@/components/SEO';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import the Home component to avoid SSR issues
const Home = dynamic(() => import('@/pages/Home'), { ssr: false });

export default function HomePage() {
  return (
    <>
      <SEO
        title="Get 3 Free Quotes | Concrete Driveway Contractors"
        description="Compare free quotes from local top-rated concrete driveway professionals near you."
      />
      <Home />
    </>
  );
}
