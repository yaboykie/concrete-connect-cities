
import { LocationContentType } from '../types';
import { formatCityName, formatStateName, createFullLocation } from './locationFormatter';
import { generateLocationFaqs } from './faqGenerator';
import { generateLocationServices } from './servicesGenerator';
import { generateLocationTestimonials } from './testimonialsGenerator';
import { generateSchemaData, generateMetaDescription } from './schemaGenerator';

/**
 * Generates fallback content if database fetch fails
 */
export const getFallbackLocationContent = (state: string, city: string): LocationContentType => {
  const formattedCity = formatCityName(city);
  const formattedState = formatStateName(state);
  const fullLocation = createFullLocation(formattedCity, formattedState);
  
  return {
    title: `Top-Rated Concrete Driveway Contractors in ${fullLocation}`,
    serviceIntro: `Looking for professional concrete driveway installation in ${fullLocation}? Our network of experienced local contractors specialize in creating beautiful, durable driveways that enhance your home's curb appeal and add lasting value to your property.`,
    weatherConsiderations: `In ${fullLocation}, local weather patterns can significantly impact concrete work. Our local contractors understand how to prepare, pour, and cure concrete specifically for the ${formattedState} climate, ensuring your driveway stands up to local weather conditions year after year.`,
    faqs: generateLocationFaqs(formattedCity, formattedState).slice(0, 1), // Just get one FAQ for fallback
    services: generateLocationServices(formattedCity).slice(0, 1), // Just get one service for fallback
    testimonials: generateLocationTestimonials(formattedCity).slice(0, 1), // Just get one testimonial for fallback
    fullLocation,
    latitude: null,
    longitude: null,
    googleMapEmbed: null,
    schemaData: generateSchemaData(fullLocation, formattedCity, formattedState, null, null),
    metaDescription: generateMetaDescription(fullLocation)
  };
};
