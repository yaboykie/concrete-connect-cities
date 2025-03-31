
import { FAQ, Service, Testimonial } from './types';

export const getLocationContent = (state: string, city: string) => {
  // Find matching location from our data
  const locationMatch = { state, city };
  
  const fullLocation = locationMatch?.state && locationMatch?.city
    ? `${city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}, ${state.toUpperCase()}`
    : `${city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}, ${state.toUpperCase()}`;
    
  const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const formattedState = state.toUpperCase();
  
  // Service specific content
  const serviceTitle = `Top-Rated Concrete Driveway Contractors in ${fullLocation}`;
  const serviceIntro = `Looking for professional concrete driveway installation in ${fullLocation}? Our network of experienced local contractors specialize in creating beautiful, durable driveways that enhance your home's curb appeal and add lasting value to your property.`;
  const weatherConsiderations = `In ${fullLocation}, local weather patterns can significantly impact concrete work. Our local contractors understand how to prepare, pour, and cure concrete specifically for the ${formattedState} climate, ensuring your driveway stands up to local weather conditions year after year.`;
  
  const faqs: FAQ[] = [
    {
      question: `How much does a concrete driveway cost in ${formattedCity}?`,
      answer: `Concrete driveway costs in ${formattedCity} typically range from $6-$12 per square foot for standard installations. Factors affecting price include size, thickness, decorative elements, and site preparation. Most homeowners invest between $3,000-$7,000 for a complete driveway. Contact us for a free, customized quote for your specific project.`
    },
    {
      question: `How long will a new concrete driveway last in ${formattedState}?`,
      answer: `With proper installation and maintenance, concrete driveways in ${formattedState} typically last 25-30 years or more. Our local contractors understand ${formattedState}'s specific climate challenges and use appropriate concrete mixes and installation techniques to maximize durability and longevity.`
    },
    {
      question: "How long does it take to install a concrete driveway?",
      answer: `A typical concrete driveway installation takes 3-5 days for removal of the old surface, preparation, pouring, and initial curing. However, you'll need to avoid driving on the new surface for at least 7 days to allow proper curing. Our local ${formattedCity} contractors will provide a specific timeline based on your project's requirements.`
    },
    {
      question: "Can I get decorative concrete for my driveway?",
      answer: `Absolutely! Our ${formattedCity} concrete contractors offer various decorative options including stamped patterns, exposed aggregate, colored concrete, and more. These options can mimic the look of more expensive materials like pavers or natural stone while maintaining the durability and affordability of concrete.`
    },
    {
      question: "Do I need a permit to replace my driveway in your area?",
      answer: `Permit requirements vary across ${formattedState}. In ${formattedCity}, most driveway replacements require a permit, especially if changing the dimensions or affecting drainage. Our local contractors are familiar with ${formattedCity}'s specific permitting requirements and can either assist with the process or handle it entirely as part of your project.`
    }
  ];
  
  const services: Service[] = [
    {
      title: "Standard Concrete Driveways",
      description: `Durable, long-lasting concrete driveways custom-designed for your ${formattedCity} home, with expert installation and finishing.`
    },
    {
      title: "Stamped Concrete Driveways",
      description: "Beautiful textured patterns that can mimic brick, stone, or tile at a fraction of the cost of these materials."
    },
    {
      title: "Colored Concrete Driveways",
      description: "Integral coloring, stains, and dyes to achieve a wide variety of hues that complement your home's exterior."
    },
    {
      title: "Exposed Aggregate Driveways",
      description: "Revealing the natural stone within the concrete for a textured, non-slip surface with natural beauty."
    },
    {
      title: "Concrete Driveway Repair",
      description: `Expert repair services for cracked, damaged, or aging concrete driveways throughout ${formattedCity}.`
    },
    {
      title: "Concrete Driveway Extensions",
      description: "Expand your existing driveway to accommodate additional vehicles or create more space for activities."
    }
  ];
  
  // Common testimonials - would be location specific in a real implementation
  const testimonials: Testimonial[] = [
    {
      name: "Michael T.",
      location: formattedCity,
      text: "The driveway contractor I found through ConcreterQuotes was fantastic. They completed my driveway on time and on budget. The finished result looks amazing!",
      rating: 5
    },
    {
      name: "Sarah L.",
      location: formattedCity,
      text: "Great experience from quote to completion. The concrete driveway they installed is beautiful and exactly what we wanted. Very professional service.",
      rating: 5
    },
    {
      name: "Robert J.",
      location: formattedCity,
      text: "After getting multiple quotes, the contractor I found through this service offered the best value. Quality work on our driveway and professional service throughout.",
      rating: 4
    }
  ];
  
  return {
    title: serviceTitle,
    serviceIntro,
    weatherConsiderations,
    faqs,
    services,
    testimonials,
    fullLocation
  };
};
