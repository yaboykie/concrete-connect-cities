
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MatchEstimateSection = () => {
  return (
    <section className="bg-white py-16 px-6 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">
        Ready to See Which Texas Concreters Match Your Estimate?
      </h2>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        If your estimate looks about right, we'll show you 2–3 concreters in your area who are rated 4.7★ or higher on Google — and are actually available to quote your job.
      </p>

      <ul className="flex flex-col md:flex-row justify-center gap-6 text-sm text-left max-w-4xl mx-auto mb-8">
        <li className="flex items-start gap-2">
          ✅ No chasing. No voicemails. No pressure.
        </li>
        <li className="flex items-start gap-2">
          ✅ Quotes only from concreters we've verified in Texas.
        </li>
        <li className="flex items-start gap-2">
          ✅ Many respond within 24 hours.
        </li>
      </ul>

      <div className="flex justify-center">
        <Button 
          className="bg-brand-blue text-white px-6 py-3 rounded-lg text-lg hover:bg-brand-blue/90 transition"
        >
          Show Me My Local Matches <ArrowRight className="ml-1 h-5 w-5" />
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        We only match you with concreters rated 4.7★ or higher — no junk leads or spam.
      </p>
    </section>
  );
};

export default MatchEstimateSection;
