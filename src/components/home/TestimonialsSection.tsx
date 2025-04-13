
import React from 'react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Real Homeowners. Real Projects. No Guesswork.
        </h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-sm text-gray-800">
              "I was getting quotes from $6,000 to $14,000 for the same driveway. ConcreterQuotes showed me what was actually normal in my area — and matched me with two concreters who didn't play games. We had the job booked in 48 hours."
            </p>
            <p className="mt-2 text-xs text-gray-500 italic">
              — Jennifer M., Austin, TX
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-sm text-gray-800">
              "I'd put off replacing our slab for years because I didn't know where to start. Within 15 minutes I had a price range, and by the end of the day I had a quote. No chasing. No voicemails."
            </p>
            <p className="mt-2 text-xs text-gray-500 italic">
              — Daniel R., Charlotte, NC
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-sm text-gray-800">
              "Everyone says they'll get back to you. These guys actually did — fast. I picked the concreter who explained everything in detail and showed up when he said he would."
            </p>
            <p className="mt-2 text-xs text-gray-500 italic">
              — Melissa G., Sacramento, CA
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow-sm">
            <p className="text-sm text-gray-800">
              "I'm not a contractor. I didn't want to guess at the price or get talked down. The estimate made it simple. The contractor did exactly what he said he'd do."
            </p>
            <p className="mt-2 text-xs text-gray-500 italic">
              — Ahmed H., Tampa, FL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
