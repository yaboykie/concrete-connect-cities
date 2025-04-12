
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocationsList from '@/components/driveway-concreters/LocationsList';

const MainLocationsView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LocationsList />
      <Footer />
    </div>
  );
};

export default MainLocationsView;
