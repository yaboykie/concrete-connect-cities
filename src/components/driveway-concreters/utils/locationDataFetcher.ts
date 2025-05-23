
import { createClient } from '@supabase/supabase-js';

interface LocationMapDataResponse {
  location_data: any;
  map_data: any;
}

interface LocationFetchResult {
  locationData: any | null;
  mapData: any | null;
  error: string | null;
}

// Simple in-memory cache to avoid repeated database calls
const locationCache = new Map<string, LocationFetchResult>();

// Supabase client initialization with better error handling
const getSupabaseClient = () => {
  // Use import.meta.env for Vite projects
  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key is missing. Check your environment variables.');
    throw new Error('Supabase configuration is incomplete');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

export function clearLocationCache(state?: string, city?: string) {
  if (state && city) {
    const key = `${state.toUpperCase()}_${city.replace(/-/g, ' ')}`;
    locationCache.delete(key);
    console.log(`Cache cleared for ${key}`);
  } else {
    locationCache.clear();
    console.log('All location cache cleared');
  }
}

async function fallbackLocationFetch(state: string, city: string): Promise<LocationFetchResult> {
  console.warn(`Fallback fetch triggered for ${city}, ${state}. Returning null data.`);
  return {
    locationData: null,
    mapData: null,
    error: `No data found for ${city}, ${state}.`,
  };
}

export async function fetchLocationFromSupabase(
  state: string,
  city: string
): Promise<LocationFetchResult> {
  try {
    const stateUpper = state.toUpperCase();
    const citySlug = city.replace(/-/g, ' ');
    const cacheKey = `${stateUpper}_${citySlug}`;
    
    // Check if we have a cached result
    if (locationCache.has(cacheKey)) {
      console.log(`Using cached data for ${citySlug}, ${stateUpper}`);
      return locationCache.get(cacheKey)!;
    }
    
    console.log(`Fetching location map data for ${citySlug}, ${stateUpper}...`);
    
    // Create Supabase client
    try {
      const supabase = getSupabaseClient();
      
      // Fixing the type error by correctly typing the RPC call
      const { data, error } = await supabase.rpc(
        'get_location_with_map_data',
        {
          p_state: stateUpper,
          p_city_slug: citySlug,
        }
      );

      if (error) {
        console.error('Error fetching location map data:', error);
        return {
          locationData: null,
          mapData: null,
          error: `Failed to fetch data: ${error.message}`,
        };
      }

      // Check if data is valid
      if (!Array.isArray(data) || data.length === 0) {
        console.warn(`No valid data returned for ${citySlug}, ${stateUpper}. Using fallback.`);
        return await fallbackLocationFetch(stateUpper, citySlug);
      }

      const response = data[0];
      const result: LocationFetchResult = {
        locationData: response.location_data ?? null,
        mapData: response.map_data ?? null,
        error: null,
      };

      // Cache the result
      locationCache.set(cacheKey, result);
      
      console.log(`Successfully fetched data for ${citySlug}, ${stateUpper}:`, result);
      return result;
    } catch (clientError) {
      console.error('Error creating Supabase client:', clientError);
      return {
        locationData: null,
        mapData: null,
        error: `Supabase client error: ${clientError instanceof Error ? clientError.message : String(clientError)}`,
      };
    }
  } catch (err) {
    console.error('Unexpected error in fetchLocationMapData:', err);
    return {
      locationData: null,
      mapData: null,
      error: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

export async function fetchLocationMapData(
  state: string,
  city: string
): Promise<LocationFetchResult> {
  return fetchLocationFromSupabase(state, city);
}

export const getPerformanceMetrics = (key: string) => {
  if (typeof window === 'undefined') return null;
  
  const existing = localStorage.getItem(key);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch (e) {
      console.error("Error parsing performance metrics from localStorage:", e);
      return null;
    }
  }
  return null;
};
