
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StateLocations from '@/components/driveway-concreters/StateLocations';

interface StateLocationsViewProps {
  state: string;
}

const StateLocationsView: React.FC<StateLocationsViewProps> = ({ state }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StateLocations state={state} />
      <Footer />
    </div>
  );
};

export default StateLocationsView;
