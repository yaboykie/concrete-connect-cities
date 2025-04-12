
import React from 'react';
import StateLocations from '@/components/driveway-concreters/StateLocations';

interface StateLocationsViewProps {
  state: string;
}

const StateLocationsView: React.FC<StateLocationsViewProps> = ({ state }) => {
  return (
    <StateLocations state={state} />
  );
};

export default StateLocationsView;
