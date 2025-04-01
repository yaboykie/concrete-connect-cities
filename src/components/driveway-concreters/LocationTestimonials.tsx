
import React from 'react';
import TestimonialSection from '@/components/TestimonialSection';
import { Testimonial } from './types';

interface LocationTestimonialsProps {
  testimonials: Testimonial[];
  city: string;
}

const LocationTestimonials: React.FC<LocationTestimonialsProps> = ({ testimonials, city }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What {city} Residents Are Saying About Our Concrete Contractors
        </h2>
        <TestimonialSection testimonials={testimonials} />
      </div>
    </section>
  );
};

export default LocationTestimonials;
