
import { supabase } from "@/integrations/supabase/client";
import { LocationData } from '../types';

type CacheEntry = {
  data: LocationFetchResult;
  timestamp: number;
};

const CACHE_TTL = 3600000; // 1 hour
const locationCache = new Map<string, CacheEntry>();

export interface LocationMapDataResponse {
  location_data?: LocationData;
  map_data?: LocationData;
}

export interface LocationFetchResult {
  locationData: LocationData | null;
  mapData: LocationData | null;
  error: string | null;
}

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

export const fetchLocationFromSupabase = async (
  state: string,
  city: string
): Promise<LocationFetchResult> => {
  try {
    const stateUpper = state.toUpperCase();
    const citySlug = city.toLowerCase();
    const cacheKey = `${stateUpper}_${citySlug}`;

    const cached = locationCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      console.log(`Using cached data for ${city}, ${stateUpper}`);
      return cached.data;
    }

    console.log(`Cache miss or expired - fetching fresh data for ${city}, ${stateUpper}`);

    // Fix: Properly specify both generic types for rpc
    const { data, error } = await supabase.rpc<LocationMapDataResponse, { p_state: string; p_city_slug: string }>('get_location_with_map_data', {
      p_state: stateUpper,
      p_city_slug: citySlug,
    });

    if (error) {
      console.error(`RPC error for ${city}, ${stateUpper}:`, error);
      return await fallbackLocationFetch(stateUpper, citySlug);
    }

    // Fix: Add null check and properly validate the array
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn(`RPC returned empty data for ${city}, ${stateUpper}, using fallback`);
      return await fallbackLocationFetch(stateUpper, citySlug);
    }

    const response = data[0] as LocationMapDataResponse;
    const result: LocationFetchResult = {
      locationData: response.location_data ?? null,
      mapData: response.map_data ?? null,
      error: null,
    };

    locationCache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    console.log(`Successfully fetched and cached data for ${city}, ${stateUpper}`);
    return result;
  } catch (err) {
    console.error("Main Supabase fetch failed. Trying fallback...", err);
    try {
      return await fallbackLocationFetch(state, city);
    } catch (fallbackError) {
      return { 
        locationData: null, 
        mapData: null, 
        error: err instanceof Error ? err.message : "Unknown error" 
      };
    }
  }
};

const fallbackLocationFetch = async (
  state: string,
  city: string
): Promise<LocationFetchResult> => {
  console.log(`Attempting fallback fetch for ${city}, ${state}`);
  
  try {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const stateUpper = state.toUpperCase();

    const { data: locationData, error } = await supabase
      .from("All locations")
      .select("*")
      .eq("state_abbreviation", stateUpper)
      .ilike("city", formattedCity)
      .maybeSingle<LocationData>();

    if (error) {
      console.error("Error fetching fallback location:", error);
      return { locationData: null, mapData: null, error: error.message };
    }

    const { data: mapData, error: mapError } = await supabase
      .from("Location Data for Location pages")
      .select("*")
      .eq("State", stateUpper)
      .ilike("City", formattedCity)
      .maybeSingle<LocationData>();

    if (mapError) {
      console.error("Error fetching fallback map data:", mapError);
      return { locationData, mapData: null, error: mapError.message };
    }

    console.log("Fallback succeeded - data retrieved:", { locationData, mapData });
    return { locationData, mapData, error: null };
  } catch (err) {
    console.error("Final fallback failed:", err);
    return {
      locationData: null,
      mapData: null,
      error: err instanceof Error ? err.message : "Unknown fallback error",
    };
  }
};
