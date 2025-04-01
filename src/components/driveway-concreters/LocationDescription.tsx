
import React from 'react';
import { LocationContentType } from './types';

interface LocationDescriptionProps {
  locationContent: LocationContentType;
  city: string;
  state: string;
}

const LocationDescription: React.FC<LocationDescriptionProps> = ({ locationContent, city, state }) => {
  // Determine if the location is in New England
  const isNewEngland = ["ME", "NH", "VT", "MA", "RI", "CT"].includes(state.toUpperCase());
  
  // Use appropriate weather description based on location
  const getWeatherDescription = () => {
    if (isNewEngland) {
      return "unpredictable New England weather";
    } else if (state.toUpperCase() === "HI") {
      return "tropical Hawaiian climate";
    } else if (["WA", "OR", "ID", "MT", "WY"].includes(state.toUpperCase())) {
      return "Pacific Northwest climate conditions";
    } else if (["TX", "NM", "AZ", "OK", "LA"].includes(state.toUpperCase())) {
      return "harsh southwestern sun and occasional heavy rains";
    } else if (["FL", "GA", "SC", "NC", "VA", "AL", "MS"].includes(state.toUpperCase())) {
      return "humid southern climate";
    } else if (["MI", "WI", "MN", "ND", "SD", "IL", "IN", "OH"].includes(state.toUpperCase())) {
      return "extreme Midwest temperature fluctuations";
    } else {
      return "local climate conditions";
    }
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Why Homeowners in {city} are Choosing Concrete Driveways
          </h2>
          <p className="text-lg mb-6">
            Homeowners in {locationContent.fullLocation} are increasingly investing in concrete driveways due to the {getWeatherDescription()}. 
            Freezing temperatures, snow, ice, or intense heat can cause wear on asphalt driveways, leading to cracks and deterioration. 
            A concrete driveway offers more durability and resistance to extreme weather conditions. Plus, it adds curb appeal, 
            which is important for {city}'s neighborhoods.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">
            The Cost-Effectiveness of Concrete Driveways
          </h2>
          <p className="text-lg mb-6">
            While a concrete driveway might have a higher initial cost compared to asphalt, it's far more cost-effective in the long run. 
            Homeowners can save money on maintenance and repairs, especially in {city}'s climate, 
            where asphalt requires more upkeep due to cracks caused by temperature shifts.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">
            How to Choose the Best Concrete Driveway Contractor in {city}
          </h2>
          <p className="text-lg mb-6">
            Selecting a reliable, experienced concrete contractor is essential for ensuring quality work. 
            Look for professionals who are licensed, insured, and have good reviews from local customers. 
            When you use our service, you get access to only the best, vetted professionals, so you can feel confident in your choice.
          </p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6">
            Looking for professional concrete driveway installation in {locationContent.fullLocation}?
          </h2>
          <p className="text-lg mb-6">
            Our network of experienced local contractors specialize in creating beautiful, durable driveways that enhance your home's 
            curb appeal and add lasting value to your property. In {locationContent.fullLocation}, local weather patterns can significantly 
            impact concrete work. Our local contractors understand how to prepare, pour, and cure concrete specifically for the {state} climate, 
            ensuring your driveway stands up to local weather conditions year after year.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg mt-8 mb-8">
            <h3 className="text-xl font-bold mb-3">🚀 The Convenience of Our Service</h3>
            <p className="text-lg">
              Forget about endless calls and days of waiting for quotes. In just 10 seconds, you can post your job, 
              and the best local concrete professionals will offer bids for your project. Our service makes it simple, 
              quick, and easy to get the right concrete company for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationDescription;
