
import { LocationContentType, LocationData } from './types';
import { fetchLocationFromSupabase, clearLocationCache } from './utils/locationDataFetcher';
import { formatCityName, formatStateName, createFullLocation } from './utils/locationFormatter';
import { generateLocationFaqs } from './utils/faqGenerator';
import { generateLocationServices } from './utils/servicesGenerator';
import { generateLocationTestimonials } from './utils/testimonialsGenerator';
import { generateSchemaData, generateMetaDescription } from './utils/schemaGenerator';
import { getFallbackLocationContent } from './utils/fallbackContentGenerator';

// Performance monitoring
const perfMetrics = new Map<string, {
  loadCount: number, 
  totalLoadTime: number,
  lastLoadTime: number,
  errors: number
}>();

/**
 * Main function to get location content for a specific city and state
 */
export const getLocationContent = async (state: string, city: string): Promise<LocationContentType> => {
  const startTime = performance.now();
  const locationKey = `${state}_${city}`;
  
  try {
    // Fetch data from Supabase with caching
    const { locationData, mapData, error } = await fetchLocationFromSupabase(state, city);
    
    if (error) {
      console.error(`Error fetching location data for ${city}, ${state}:`, error);
      
      // Update metrics
      updatePerformanceMetrics(locationKey, performance.now() - startTime, true);
      
      // If there's an error, use fallback content
      return getFallbackLocationContent(state, city);
    }
    
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
    // Handle either property naming convention from database (camelCase or PascalCase)
    const googleMapEmbed = (mapData as any)?.googleMapEmbed || (mapData as any)?.GoogleMapEmbed || null;
    
    // Get latitude and longitude values from the map data or location data
    // Handle either property naming convention from database (camelCase or PascalCase)
    const latitude = (mapData as any)?.latitude || (mapData as any)?.Latitude || locationData?.latitude || null;
    const longitude = (mapData as any)?.longitude || (mapData as any)?.Longitude || locationData?.longitude || null;
    
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
    
    // Add debug log to help diagnose data issues
    console.log('Fetched location content:', {
      locationData,
      mapData,
      latitude,
      longitude,
      googleMapEmbed
    });
    
    // Update performance metrics
    updatePerformanceMetrics(locationKey, performance.now() - startTime);
    
    return {
      title: serviceTitle || "Driveway Concreters",
      serviceIntro: serviceIntro || "Looking for trusted contractors?",
      weatherConsiderations: weatherConsiderations || "",
      faqs: faqs || [],
      services: services || [],
      testimonials: testimonials || [],
      fullLocation: fullLocation || `${formattedCity}, ${formattedState}`,
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      googleMapEmbed: googleMapEmbed ?? "https://maps.google.com",
      schemaData: schemaData || {},
      metaDescription: metaDescription || "Find driveway concreters near you"
    };
  } catch (error) {
    console.error(`Unexpected error in getLocationContent for ${city}, ${state}:`, error);
    
    // Update metrics with error
    updatePerformanceMetrics(locationKey, performance.now() - startTime, true);
    
    // Return fallback content
    return getFallbackLocationContent(state, city);
  }
};

/**
 * Update performance metrics for a location
 */
const updatePerformanceMetrics = (
  locationKey: string, 
  loadTime: number,
  isError: boolean = false
) => {
  const existing = perfMetrics.get(locationKey) || {
    loadCount: 0,
    totalLoadTime: 0,
    lastLoadTime: 0,
    errors: 0
  };
  
  perfMetrics.set(locationKey, {
    loadCount: existing.loadCount + 1,
    totalLoadTime: existing.totalLoadTime + loadTime,
    lastLoadTime: loadTime,
    errors: isError ? existing.errors + 1 : existing.errors
  });
  
  // Log performance for monitoring
  console.log(`Performance for ${locationKey}: ${Math.round(loadTime)}ms (avg: ${Math.round(
    (existing.totalLoadTime + loadTime) / (existing.loadCount + 1)
  )}ms, errors: ${isError ? existing.errors + 1 : existing.errors})`);
};

/**
 * Get performance metrics for all locations or a specific location
 */
export const getPerformanceMetrics = (locationKey?: string) => {
  if (locationKey) {
    return perfMetrics.get(locationKey);
  }
  
  // Get most popular locations by visit count
  const popular = Array.from(perfMetrics.entries())
    .sort((a, b) => b[1].loadCount - a[1].loadCount)
    .slice(0, 10);
  
  // Get slowest locations by average load time
  const slowest = Array.from(perfMetrics.entries())
    .sort((a, b) => (b[1].totalLoadTime / b[1].loadCount) - (a[1].totalLoadTime / a[1].loadCount))
    .slice(0, 10);
  
  // Get locations with most errors
  const mostErrors = Array.from(perfMetrics.entries())
    .sort((a, b) => b[1].errors - a[1].errors)
    .slice(0, 10);
  
  return {
    totalLocations: perfMetrics.size,
    popular,
    slowest,
    mostErrors
  };
};

/**
 * Clear all performance metrics
 */
export const clearPerformanceMetrics = () => {
  perfMetrics.clear();
};
