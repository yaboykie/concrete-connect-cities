
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

interface ValuePropositionSectionProps {
  scrollToQuoteForm: () => void;
}

const ValuePropositionSection: React.FC<ValuePropositionSectionProps> = ({ scrollToQuoteForm }) => {
  return (
    <section className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Choose Professional Driveway Concreters?</h2>
          <p className="text-xl text-gray-200 mb-8">
            A new concrete driveway does more than just complete your home's exterior — it enhances curb appeal, 
            adds property value, and provides decades of low-maintenance durability that other materials simply can't match.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Built to Last</h3>
              <p className="text-gray-200">
                Professional concrete driveways can last 30+ years with minimal maintenance, outperforming asphalt 
                and gravel alternatives by decades.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Design Flexibility</h3>
              <p className="text-gray-200">
                From stamped patterns to decorative aggregates and color options, concrete offers unmatched 
                design versatility for any home style.
              </p>
            </div>
          </div>
          
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Benefits of Professional Driveway Installation:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                <span>Superior strength handles heavy vehicles and prevents cracks</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                <span>Stamped and decorative finishes available for a custom look</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                <span>Environmentally friendly with recycled materials</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                <span>Snow removal is easier than other surfaces</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                <span>Year-round installation in most climates</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-yellow mr-2 mt-1 flex-shrink-0" />
                <span>Minimal maintenance required for decades</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center">
            <Button className="cta-button text-lg" size="lg" onClick={scrollToQuoteForm}>
              Get My Free Driveway Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
