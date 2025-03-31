
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locationData } from '@/components/driveway-concreters/LocationData';
import { getLocationContent } from '@/components/driveway-concreters/LocationContent';
import LocationsList from '@/components/driveway-concreters/LocationsList';
import LocationDetails from '@/components/driveway-concreters/LocationDetails';

const DrivewayConcreterLocations = () => {
  const { state, city } = useParams<{ state: string; city: string }>();
  
  if (!state || !city) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <LocationsList />
        <Footer />
      </div>
    );
  }
  
  const locationContent = getLocationContent(state, city);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LocationDetails locationContent={locationContent} />
      <Footer />
    </div>
  );
};

export default DrivewayConcreterLocations;
