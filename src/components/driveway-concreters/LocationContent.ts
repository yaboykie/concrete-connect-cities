
import { LocationContentType, LocationData } from './types';
import { fetchLocationFromSupabase } from './utils/locationDataFetcher';
import { formatCityName, formatStateName, createFullLocation } from './utils/locationFormatter';
import { generateLocationFaqs } from './utils/faqGenerator';
import { generateLocationServices } from './utils/servicesGenerator';
import { generateLocationTestimonials } from './utils/testimonialsGenerator';
import { generateSchemaData, generateMetaDescription } from './utils/schemaGenerator';
import { getFallbackLocationContent } from './utils/fallbackContentGenerator';

/**
 * Main function to get location content for a specific city and state
 */
export const getLocationContent = async (state: string, city: string): Promise<LocationContentType> => {
  try {
    // Fetch data from Supabase
    const { locationData, mapData } = await fetchLocationFromSupabase(state, city);
    
    // Format location names
    const formattedCity = formatCityName(city);
    
    // Use fetched data or fall back to generated content
    const locationMatch: Partial<LocationData> = locationData || { 
      state: state, 
      city: city,
      state_abbreviation: state.toUpperCase(),
      latitude: null,
      longitude: null,
    };
    
    // Format the state name
    const formattedState = formatStateName(locationMatch.state, locationMatch.state_abbreviation);
    
    // Create full location string
    const fullLocation = createFullLocation(formattedCity, formattedState);
    
    // Service specific content
    const serviceTitle = `Top-Rated Concrete Driveway Contractors in ${fullLocation}`;
    const serviceIntro = `Looking for professional concrete driveway installation in ${fullLocation}? Our network of experienced local contractors specialize in creating beautiful, durable driveways that enhance your home's curb appeal and add lasting value to your property.`;
    const weatherConsiderations = `In ${fullLocation}, local weather patterns can significantly impact concrete work. Our local contractors understand how to prepare, pour, and cure concrete specifically for the ${formattedState} climate, ensuring your driveway stands up to local weather conditions year after year.`;
    
    // Generate FAQs, services, and testimonials
    const faqs = generateLocationFaqs(formattedCity, formattedState);
    const services = generateLocationServices(formattedCity);
    const testimonials = generateLocationTestimonials(formattedCity);
    
    // Google Map embed from Supabase if available
    const googleMapEmbed = mapData?.GoogleMapEmbed || null;
    
    // Get latitude and longitude values from the map data or location data
    const latitude = mapData?.Latitude || null;
    const longitude = mapData?.Longitude || null;
    
    // Schema data for SEO
    const schemaData = generateSchemaData(
      fullLocation, 
      formattedCity, 
      formattedState, 
      latitude, 
      longitude,
      locationMatch.schema_data
    );
    
    // Meta description for SEO
    const metaDescription = generateMetaDescription(fullLocation, locationMatch.meta_description);
    
    return {
      title: serviceTitle,
      serviceIntro,
      weatherConsiderations,
      faqs,
      services,
      testimonials,
      fullLocation,
      latitude,
      longitude,
      googleMapEmbed,
      schemaData,
      metaDescription
    };
  } catch (error) {
    console.error("Error in getLocationContent:", error);
    // Return fallback content
    return getFallbackLocationContent(state, city);
  }
};
