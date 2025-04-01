
import React from 'react';
import { LocationContentType } from './types';

interface MainContentSectionProps {
  locationContent: LocationContentType;
  city: string;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({ locationContent, city }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Why Homeowners in {city} are Choosing Concrete Driveways
          </h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Homeowners in {locationContent.fullLocation} are increasingly investing in concrete driveways due to the unpredictable New England weather. Freezing temperatures, snow, and ice can cause wear on asphalt driveways, leading to cracks and deterioration. A concrete driveway offers more durability and resistance to extreme weather conditions. Plus, it adds curb appeal, which is important for {city}'s charming historic neighborhoods.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">The Cost-Effectiveness of Concrete Driveways</h3>
            <p>
              While a concrete driveway might have a higher initial cost compared to asphalt, it's far more cost-effective in the long run. Homeowners can save money on maintenance and repairs, especially in {city}'s climate, where asphalt requires more upkeep due to cracks caused by temperature shifts.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">How to Choose the Best Concrete Driveway Contractor in {city}</h3>
            <p>
              Selecting a reliable, experienced concrete contractor is essential for ensuring quality work. Look for professionals who are licensed, insured, and have good reviews from local customers. When you use our service, you get access to only the best, vetted professionals, so you can feel confident in your choice.
            </p>
            
            <p>
              {locationContent.serviceIntro}
            </p>
            <p>
              {locationContent.weatherConsiderations}
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <a href="#quote-form" className="cta-button inline-block">
              Get 3 Free Quotes from Local Concrete Pros
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContentSection;
