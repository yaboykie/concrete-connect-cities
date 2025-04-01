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

async function fallbackLocationFetch(state: string, city: string): Promise<LocationFetchResult> {
  console.warn(`Fallback fetch triggered for ${city}, ${state}. Returning null data.`);
  return {
    locationData: null,
    mapData: null,
    error: `No data found for ${city}, ${state}.`,
  };
}

export async function fetchLocationMapData(
  state: string,
  city: string
): Promise<LocationFetchResult> {
  try {
    const stateUpper = state.toUpperCase();
    const citySlug = city.replace(/-/g, ' ');
    
    console.log(`Fetching location map data for ${citySlug}, ${stateUpper}...`);
    
    // Create Supabase client
    const supabase = createClient(
      process.env.VITE_PUBLIC_SUPABASE_URL as string,
      process.env.VITE_PUBLIC_SUPABASE_KEY as string,
    );

    // Explicitly type the RPC return type
    const { data, error } = await supabase.rpc<LocationMapDataResponse[]>('get_location_with_map_data', {
      p_state: stateUpper,
      p_city_slug: citySlug,
    });

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

    return result;
  } catch (err) {
    console.error('Unexpected error in fetchLocationMapData:', err);
    return {
      locationData: null,
      mapData: null,
      error: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}

export const getLocationContent = async (state: string, city: string) => {
  try {
    const { locationData, mapData, error } = await fetchLocationMapData(state, city);
    
    if (error) {
      console.error("Error fetching data:", error);
      throw new Error(error);
    }
    
    if (!locationData) {
      console.warn("No location data received from Supabase.");
      throw new Error("No location data received.");
    }
    
    // Merge locationData and mapData
    const locationContent = {
      ...locationData,
      ...mapData,
    };
    
    return locationContent;
  } catch (error) {
    console.error("Error in getLocationContent:", error);
    throw error;
  }
};

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
