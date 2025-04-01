
import { supabase, handleSupabaseError } from "@/integrations/supabase/client";
import { LocationData } from '../types';

// Simple in-memory cache implementation
type CacheEntry = {
  data: any;
  timestamp: number;
};

// Cache configuration
const CACHE_TTL = 3600000; // 1 hour in milliseconds
const locationCache = new Map<string, CacheEntry>();

/**
 * Clear the location cache, either for a specific location or the entire cache
 */
export const clearLocationCache = (state?: string, city?: string) => {
  if (state && city) {
    const cacheKey = `${state.toLowerCase()}_${city.toLowerCase()}`;
    locationCache.delete(cacheKey);
    console.log(`Cache cleared for ${city}, ${state}`);
  } else {
    locationCache.clear();
    console.log('Entire location cache cleared');
  }
};

// Define types for the RPC function response
interface LocationMapDataResponse {
  location_data?: Partial<LocationData>;
  map_data?: any;
}

/**
 * Fetches location data from the Supabase database with caching
 */
export const fetchLocationFromSupabase = async (
  state: string,
  city: string
): Promise<{ locationData: Partial<LocationData> | null; mapData: any | null; error: string | null }> => {
  try {
    // Generate cache key and normalize inputs
    const stateUpper = state.toUpperCase();
    const citySlug = city.toLowerCase();
    const cacheKey = `${stateUpper}_${citySlug}`;
    
    console.log(`Processing location request for ${city}, ${stateUpper}`);
    
    // Check cache first
    const cachedData = locationCache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
      console.log(`Using cached data for ${city}, ${stateUpper}`);
      return cachedData.data;
    }
    
    console.log(`Cache miss or expired - fetching fresh data for ${city}, ${stateUpper}`);
    
    // Use the new database function for efficient querying
    const { data, error } = await supabase
      .rpc('get_location_with_map_data', { 
        p_state: stateUpper, 
        p_city_slug: citySlug 
      });
    
    if (error) {
      console.error("Error in get_location_with_map_data RPC:", error);
      return { locationData: null, mapData: null, error: error.message };
    }
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn(`No data found for location: ${city}, ${stateUpper}`);
      // Fallback to the old method if the new method fails
      return await fallbackLocationFetch(stateUpper, city);
    }
    
    // Transform the response data to match expected format
    const responseData = data[0] as LocationMapDataResponse;
    const result = {
      locationData: responseData?.location_data || null,
      mapData: responseData?.map_data || null,
      error: null
    };
    
    // Store in cache
    locationCache.set(cacheKey, { 
      data: result, 
      timestamp: Date.now() 
    });
    
    console.log(`Successfully fetched and cached data for ${city}, ${stateUpper}`);
    return result;
  } catch (error) {
    console.error("Unexpected error in fetchLocationFromSupabase:", error);
    // Try fallback method if the main method fails
    try {
      return await fallbackLocationFetch(state, city);
    } catch (fallbackError) {
      return { 
        locationData: null, 
        mapData: null, 
        error: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }
};

/**
 * Fallback method to fetch location data using the old approach
 * This is used if the new RPC method fails
 */
const fallbackLocationFetch = async (
  state: string, 
  city: string
): Promise<{ locationData: Partial<LocationData> | null; mapData: any | null; error: string | null }> => {
  console.log(`Attempting fallback fetch for ${city}, ${state}`);
  
  try {
    // Format city name for database query (capitalize first letter of each word)
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const stateUpper = state.toUpperCase();
    
    // Try to get location data from Supabase - first from the All locations table
    const { data: locationData, error } = await supabase
      .from("All locations")
      .select("*")
      .eq("state_abbreviation", stateUpper)
      .ilike("city", formattedCity)
      .maybeSingle();

    if (error) {
      console.error("Error fetching from All locations:", error);
      return { locationData: null, mapData: null, error: error.message };
    }

    // Also try to get from the Location Data table which has map embeds
    const { data: mapData, error: mapError } = await supabase
      .from("Location Data for Location pages")
      .select("*")
      .eq("State", stateUpper)
      .ilike("City", formattedCity)
      .maybeSingle();

    if (mapError) {
      console.error("Error fetching map data:", mapError);
      return { locationData, mapData: null, error: mapError.message };
    }

    console.log("Fallback succeeded - data retrieved:", { locationData, mapData });
    return { locationData, mapData, error: null };
  } catch (error) {
    console.error("Error in fallback location fetch:", error);
    return { 
      locationData: null, 
      mapData: null, 
      error: error instanceof Error ? error.message : "Unknown error in fallback" 
    };
  }
};
