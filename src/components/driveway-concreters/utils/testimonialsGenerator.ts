
import { Testimonial } from '../types';

/**
 * Generates location-specific testimonials
 */
export const generateLocationTestimonials = (city: string): Testimonial[] => {
  return [
    {
      name: "Michael T.",
      location: city,
      text: "The driveway contractor I found through ConcreterQuotes was fantastic. They completed my driveway on time and on budget. The finished result looks amazing!",
      rating: 5
    },
    {
      name: "Sarah L.",
      location: city,
      text: "Great experience from quote to completion. The concrete driveway they installed is beautiful and exactly what we wanted. Very professional service.",
      rating: 5
    },
    {
      name: "Robert J.",
      location: city,
      text: "After getting multiple quotes, the contractor I found through this service offered the best value. Quality work on our driveway and professional service throughout.",
      rating: 4
    }
  ];
};
