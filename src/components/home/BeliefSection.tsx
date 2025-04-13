
import React from 'react';

const BeliefSection: React.FC = () => {
  return (
    <section className="bg-white py-8 px-4">
      <div className="container mx-auto max-w-2xl text-center">
        <p className="text-sm text-gray-700 mt-4">
          Homeowners tell us the hardest part of any concrete job is knowing what's fair.
        </p>

        <p className="text-sm text-gray-700">
          That's why this estimate uses real pricing from concreters we already work with — filtered by your state, job type, and finish.
        </p>

        <p className="text-sm text-gray-700">
          No one's quoting your job here. We're just showing you what homeowners nearby are actually paying — so you're not guessing.
        </p>
      </div>
    </section>
  );
};

export default BeliefSection;
